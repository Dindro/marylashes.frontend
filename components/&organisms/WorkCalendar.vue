<template>
	<div class="work-calendar">
		<client-only>
			<VueCal
				ref="vuecal"
				locale="ru"
				hide-view-selector
				overlaps-per-time-step
				:todayButton="todayVisible"
				:time-from="timeFrom"
				:time-to="timeTo"
				:disable-views="['years', 'year', 'month', 'day']"
				:snap-to-time="snapToTime"
				:special-hours="availableDaysNormalize"
				:drag-to-create-event="dragToCreateEvent"
				:events="events"
				editable-events
				:on-event-click="onEventClick"
				:drag-to-create-threshold="0"
				:timeCellHeight="calendarTimeCellHeight"
				@event-drop="onEventDrop"
				@view-change="onViewChange"
				@event-duration-change="onEventDurationChange"
				@event-drag-create="onEventDragCreate">
				<template #title="{ view }">
					<p class="work-calendar__title">{{ view.startDate.format('MMMM YYYY') }}</p>
				</template>

				<template #arrow-prev>
					<Btn :button="buttonPrev"/>
				</template>

				<template #arrow-next>
					<Btn :button="buttonNext"/>
				</template>

				<template #today-button>
					<span>{{ todayText }}</span>
				</template>

				<template #weekday-heading="{ heading }">
					<WeekDayHeader
						:name="getWeekDay(+heading.date.format('d') - 1)"
						:number="+heading.date.format('D')"
						:active="isCurrentDay(heading.date)"/>
				</template>

				<template #event="{ event }">
					<component :is="eventComponent" :event="getNormalizeEvent(event)" @delete="onEventDelete"/>
				</template>
			</VueCal>
		</client-only>

		<div class="work-calendar__footer">
			<div class="work-calendar__labels"></div>
			<div class="work-calendar__actions">

				<!-- Добавить свободные дни -->
				<template v-if="mode === modeAvailableDay.id">
					<LinkAction
						v-if="visibleAddDefaultAvailableDays"
						:link="Object.assign({}, { tag: 'button' }, { text: availableDaysAddDefaultText })"
						@click.native="addDefaultAvailableDays"/>
				</template>

				<!-- Включить/Отключить редактирование -->
				<template v-if="mode === modeRecord.id">
					<LinkAction
						:link="Object.assign({}, { tag: 'button' }, { text: eventEditText })"
						@click.native="toggleEventEdit"/>
				</template>

				<!-- Режим -->
				<LinkAction
					:link="Object.assign({}, { tag: 'button' }, { text: modeToggleText })"
					@click.native="toggleMode"/>
			</div>
		</div>
	</div>
</template>

<script>
import Btn from '+/Button';
import LinkAction from '+/LinkAction';
import WeekDayHeader from '=/Week/WeekDayHeader';
import WorkCalendarEvent from '^/WorkCalendarEvent';
import WorkCalendarAvailableEvent from '^/WorkCalendarAvailableEvent';
import 'vue-cal/dist/vuecal.css';

import { convertToScalingPx } from '@/utils/convert';
import { equalDates, dateLocales, getTimeByMinutesCount, getMinutesCount, getWeekDayIndex } from '@/utils/dates';

let VueCal;
if (process.client) {
	VueCal = require('vue-cal');
	require('vue-cal/dist/drag-and-drop');
	require('vue-cal/dist/i18n/ru');
}

const AVAILABLE_DAY_CLASS = 'wc-available-day';

const MODE_RECORD = {
	id: 'record',
	component: WorkCalendarEvent,
	text: 'Режим записи',
	sourceName: 'records',
};

const MODE_AVAILABLE_DAY = {
	id: 'availableDay',
	component: WorkCalendarAvailableEvent,
	text: 'Режим доступные дни',
	sourceName: 'availableDays',
};

const MIN_TIME = 10 * 60;
const MAX_TIME = 19 * 60;

/**
 * При первичной загрузке
 *   Загружаем доступные дни этой недели
 *   Загружаем записи
 *
 * Проблема - перетаскивание на следующие недели
 */

export default {
	components: {
		VueCal,
		LinkAction,
		Btn,
		WeekDayHeader,
		WorkCalendarEvent,
	},

	props: {
		value: Number,
	},

	data: (ctx) => {
		return {
			modeRecord: MODE_RECORD,
			modeAvailableDay: MODE_AVAILABLE_DAY,
			modeToggleText: '',
			mode: MODE_RECORD.id,
			eventComponent: MODE_RECORD.component,
			dragToCreateEvent: false,
			enableEventEdit: false,
			calendarTimeCellHeight: 48,
			snapToTime: 30,
			todayVisible: false,
			todayText: 'Перейти в текующую неделю',
			availableDaysAddDefaultText: 'Добавить свободные дни',
			availableDays: {
				6: { from: 13 * 60, to: 18 * 60, id: 1 }
			},
			records: [
				{
					id: 10,
					start: new Date(2021, 0, 26, 14, 0),
					end: new Date(2021, 0, 26, 17, 30),
					status: 'report',
					user: {
						name: 'Мария Ижуткина',
					},
				},
				{
					id: 11,
					start: new Date(2021, 0, 27, 14, 0),
					end: new Date(2021, 0, 27, 17, 30),
					status: 'correct',
					user: {
						name: 'Семенова Ирина',
					},
				}
			],

			// Сообытия, имя ссылающее на массив событий
			eventsSourceName: MODE_RECORD.sourceName,
		}
	},

	computed: {
		events() {
			return this.getEvents();
		},

		eventEditText() {
			return this.enableEventEdit ? 'Отключить редактирование' : 'Включить редактирование';
		},

		availableDaysNormalize() {
			return this.getAvailableDaysNormalize(this.availableDays);
		},

		// Флаг показа добавления доступных дней по умолчанию
		visibleAddDefaultAvailableDays() {
			/**
			 * Убедиться что нет свободных дней на текущей неделе И не в состоянии загрузки свободных дней
			 * Если нет свободных нет то показываем
			 */
			const loadingAvailableDays = false;
			const existAvailableDaysOnCurrentWeek = this.getExistAvailableDays();

			return !existAvailableDaysOnCurrentWeek && !loadingAvailableDays;
		},

		timeFrom() {
			return MIN_TIME;
		},

		timeTo() {
			return MAX_TIME;
		},

		buttonNavigation() {
			return {
				color: 'transparent-dark',
				round: true,
				size: 'lg',
			};
		},

		buttonPrev() {
			const button = {
				icon: { name: '24/arrow-left' },
				title: 'Назад',
			};

			return Object.assign({}, button, this.buttonNavigation);
		},

		buttonNext() {
			const button = {
				icon: { name: '24/arrow-right' },
				title: 'Вперед',
			};

			return Object.assign({}, button, this.buttonNavigation);
		}
	},

	beforeMount() {
		this.calendarTimeCellHeight = convertToScalingPx(48);
	},

	created() {
		this.setOptionsByMode(this.mode);
	},

	methods: {
		getEvents() {
			const events = this[this.eventsSourceName];

			// Редактировать вожмноно в Свободные дни И в режиме Редактирования
			const editable = this.modeAvailableDay.id === this.mode || this.enableEventEdit;

			// Настройки
			const setting = {
				deletable: false,
				editable: false,
				draggable: editable,
				resizable: editable,
			};

			return events.map(event => Object.assign(
				{},
				setting,
				event,
				{ selected: this.value === event.id }));
		},

		toggleEventEdit() {
			this.enableEventEdit = !this.enableEventEdit;
		},

		getShouldMode(mode) {
			return mode === this.modeRecord.id ? this.modeAvailableDay.id : this.modeRecord.id;
		},

		// Переключить режим редактирования доступного дня | редактирования записей
		toggleMode() {
			const modeShould = this.getShouldMode(this.mode);
			this.setOptionsByMode(modeShould);
		},

		// Установить настройки для мода
		setOptionsByMode(mode) {
			switch (mode) {
				case this.modeAvailableDay.id:
					this.setOptionsAvailableDayMode();
					break;

				case this.modeRecord.id:
				default:
					this.setOptionsRecordMode();
					break;
			}
		},

		setOptionsAvailableDayMode() {
			this.mode = this.modeAvailableDay.id;
			this.modeToggleText = this.modeAvailableDay.text;
			this.enableEventEdit = false;

			// Формируем из них events
			this.availableDays = this.createEventsAvailableDaysByObject(this.availableDays);

			// Назначаем источника событий
			this.eventsSourceName = this.modeAvailableDay.sourceName;
			this.eventComponent = this.modeAvailableDay.component;
			this.dragToCreateEvent = true;
			this.$emit('input', null);
		},

		setOptionsRecordMode() {
			this.mode = this.modeRecord.id;
			this.modeToggleText = this.modeRecord.text;

			// Формируем из них объект
			this.availableDays = this.createAvailableDaysByEvents(this.availableDays);

			// Назначаем источника событий
			this.eventsSourceName = this.modeRecord.sourceName;
			this.eventComponent = this.modeRecord.component;
			this.dragToCreateEvent = false;
		},

		createAvailableDaysByEvents(events) {
			// Если events объект возвращаем его же
			if (events && !Array.isArray(events)) return events;

			const week = {};

			for (const event of events) {
				const eventDay = this.createAvailableDayByEvent(event);

				// Расчитать какой день недели
				const countWeekDay = getWeekDayIndex(event.start) + 1;

				// Нужно событие добавить в week
				// Получаем день
				const weekDay = week[countWeekDay];

				// Если событие уже записано и оно не массив, то превращаем в массив
				if (weekDay && !weekDay.length) {
					weekDay = [weekDay];
				}

				// Добавляем событие
				if (Array.isArray(weekDay)) {
					weekDay.push(eventDay);
				} else {
					week[countWeekDay] = eventDay;
				}
			}

			return week;
		},

		// Получаем формат availableDay
		createAvailableDayByEvent(event) {
			const { start, end, ...other } = event;

			return {
				from: getMinutesCount(start),
				to: getMinutesCount(end),
				...other,
			};
		},

		createEventsAvailableDaysByObject(week) {
			// Если week массив возвращаем его же
			if (Array.isArray(week)) return week;

			const events = [];

			for (const key in week) {
				const day = week[key];

				if (Array.isArray(day)) {
					events.push(...day.map(item => this.createEventAvailableDayByObject(item, key)));
				} else if (day) {
					events.push(this.createEventAvailableDayByObject(day, key));
				}
			}

			return events;
		},

		createEventAvailableDayByObject(timeline, weekDayNumber) {
			// Минусуем день, так как начинается с 1
			weekDayNumber = weekDayNumber - 1;
			const { from, to, ...other } = timeline;
			const start = getTimeByMinutesCount(from);
			const end = getTimeByMinutesCount(to);

			// День начало недели
			const startWeekDay = new Date(this.$refs.vuecal.view.startDate.getTime());

			// Получаем день нужной недели
			const weekDay = startWeekDay.setDate(startWeekDay.getDate() + weekDayNumber);

			let startEvent = new Date(weekDay);
			startEvent = new Date(startEvent.setHours(start.hour, start.minutes, 0, 0));

			let endEvent = new Date(weekDay);
			endEvent = new Date(endEvent.setHours(end.hour, end.minutes, 0, 0));

			const event = {
				start: startEvent,
				end: endEvent,
				...other,
			};

			return event;
		},

		// Получить полные доступные дни для доступных дней
		getAvailableDaysNormalize(week) {
			if (Array.isArray(week)) return null;

			/**
			 * Структура week: {
			 *   1: {},
			 *   2: {},
			 * 	 ...
			 *   7: {}
			 * }
			 */

			const result = {};

			for (const key in week) {
				const day = week[key];

				let dayNormalize;
				if (Array.isArray(day)) {
					dayNormalize = day.map(this.getAvailableDayNormalize);
				} else {
					dayNormalize = this.getAvailableDayNormalize(day);
				}

				result[key] = dayNormalize;
			}

			return result;
		},

		// Получить полный доступный день для доступных дней
		getAvailableDayNormalize(day) {
			return Object.assign({}, day, { class: AVAILABLE_DAY_CLASS });
		},

		onEventClick(event) {
			process.env.NODE_ENV === 'development' && console.log('Event click', event);

			// Проверка на режим
			if (this.mode !== this.modeRecord.id) return;

			// Вызываем событие
			this.$emit('input', event.id);
		},

		onViewChange(e) {
			// Обновляем показ кнопки "Перейти в сегодня"
			const { startDate, endDate } = e;
			const now = new Date();
			this.todayVisible = (startDate <= now && now <= endDate) === false;
		},

		onEventDrop(e) {
			process.env.NODE_ENV === 'development' && console.log('Event drop', e);
			const { event, originalEvent } = e;

			const { id } = event;
			if (!id) return;

			const eventBase = this.findEvent(id);
			if (!eventBase) return;

			const { startTimeMinutes, endTimeMinutes } = event;
			if (startTimeMinutes < this.timeFrom || this.timeTo < endTimeMinutes || this.getIsOverlayEvents(event)) {
				// Проверка перемещение больше таймлайна или меньше
				// ИЛИ проверка на наложение друг на друга
				eventBase.start = new Date(originalEvent.start);
				eventBase.end = new Date(originalEvent.end);

			} else {
				eventBase.start = event.start;
				eventBase.end = event.end;
			}
		},

		onEventDurationChange(e) {
			process.env.NODE_ENV === 'development' && console.log('Event duration change', e);
			const { event } = e;

			const { id } = event;
			if (!id) return;

			const eventBase = this.findEvent(id);
			if (!eventBase) return;

			const { startTimeMinutes, endTimeMinutes } = event;

			if (this.getIsOverlayEvents(event)) {
				// Проверка на наложение
				const nextEvent = this.getNextEvent(event);
				const nextEventStart = nextEvent.start;
				eventBase.end = new Date(nextEventStart.getTime());

			} else if (this.timeTo < endTimeMinutes) {
				// Проверка на максимальную длину
				const time = getTimeByMinutesCount(this.timeTo);
				let date = new Date(event.end.getTime());
				date = new Date(date.setHours(time.hour, time.minutes, 0 ,0));

				eventBase.end = date;

			} else if (endTimeMinutes - startTimeMinutes < this.snapToTime) {
				// Проверка на минимальную длину
				const endMinSnapMinutes = startTimeMinutes + this.snapToTime;
				const time = getTimeByMinutesCount(endMinSnapMinutes);

				let date = new Date(event.start.getTime());
				date = new Date(date.setHours(time.hour, time.minutes, 0 ,0));

				eventBase.end = date;

			} else {
				eventBase.end = event.end;
			}
		},

		onEventDragCreate(event) {
			process.env.NODE_ENV === 'development' && console.log('Event drag create', event);

			// Метод должен работать только в available mode
			if (this.mode !== this.modeAvailableDay.id) return;

			let { start, end, startTimeMinutes, endTimeMinutes } = event;

			// Проверка на минимальную длину
			if (endTimeMinutes - startTimeMinutes < this.snapToTime) {
				const endMinSnapMinutes = startTimeMinutes + this.snapToTime;
				const time = getTimeByMinutesCount(endMinSnapMinutes);

				let date = new Date(event.start.getTime());
				end = new Date(date.setHours(time.hour, time.minutes, 0 ,0));
			}

			// Проверка на наложение
			if (this.getIsOverlayEvents(event) || startTimeMinutes < this.timeFrom || this.timeTo < endTimeMinutes) {
				// Удаляем событие используя метод библиотеки
				// Остальные манипуляции невозможны
				this.$refs.vuecal.utils.event.deleteAnEvent(event);
				return;
			}

			const availableDay = {
				start,
				end,
				draggable: false,
				resizable: false,
			};

			// TODO: Переделать
			setTimeout(() => {
				// Добавляем на сервере, получаем id
				const id = Math.random();

				this.$set(availableDay, 'id', id);
				this.$delete(availableDay, 'draggable');
				this.$delete(availableDay, 'resizable');
			}, 500);

			this.availableDays.push(availableDay);
		},

		onEventDelete(id) {
			process.env.NODE_ENV === 'development' && console.log('Event delete', id);
		},

		findEvent(id) {
			return this[this.eventsSourceName].find(event => event.id === id);
		},

		getIsOverlayEvents(event) {
			// Находим события в текущий день
			// Находим события кроме текущей
			// Находим события которые на перекрест
			const isOverlay = this[this.eventsSourceName]
				.filter(item => equalDates(item.start, event.start))
				.filter(item => item.id !== event.id)
				.some(item => this.getIsOverlayEvent(item, event));

			return isOverlay;
		},

		getNextEvent(event) {
			// Находим события в текущий день
			// Сортируем по возрастанию
			const eventsDay = this[this.eventsSourceName]
				.filter(item => equalDates(item.start, event.start))
				.sort((a, b) => a.start - b.start);

			// Получаем событие после текущей
			const currentEventIndex = eventsDay.findIndex(item => item.id === event.id);
			const nextEvent = eventsDay[currentEventIndex + 1];

			return nextEvent;
		},

		getIsOverlayEvent(a, b) {
			return (a.start < b.start && b.start < a.end)
				|| (a.start < b.end && b.end < a.end)
				|| (b.start <= a.start && a.end <= b.end);
		},

		// Добавить доступные дни по умолчанию
		addDefaultAvailableDays() {
			const defaultAvailableDay = {
				from: 12 * 60,
				to: 17 * 60,
			};

			const week = {};

			for (let weekDayNumber = 1; weekDayNumber < 8; weekDayNumber++) {
				week[weekDayNumber] = defaultAvailableDay;
			}

			const events = this.createEventsAvailableDaysByObject(week);
			this.availableDays.push(...events);
		},

		// Существует ли свободные дни на этой неделе
		getExistAvailableDays(from = this.$refs.vuecal.view.startDate, to = this.$refs.vuecal.view.endDate) {
			const events = this.availableDays;

			if (!Array.isArray(events)) return false;

			const eventsDaysBetween = events.filter(event => from < event.start && event.end < to);
			return !!eventsDaysBetween.length;
		},

		isCurrentDay(value) {
			return equalDates(value, new Date());
		},

		getWeekDay(weekDayNumber) {
			return dateLocales.ru.days[weekDayNumber];
		},

		getNormalizeEvent(event) {
			const eventNormalize = event;
			return eventNormalize;
		},
	},
}
</script>

<style lang="scss">
.work-calendar {
	&__footer {
		display: flex;
		margin-top: rem(16);
	}

	&__labels {
		flex: 1 1 auto;
	}

	&__actions {
		display: flex;
		flex-wrap: wrap;
		margin-left: rem(-24);
		margin-top: rem(-16);

		> * {
			margin-left: rem(24);
			margin-top: rem(16);
		}
	}

	&__title {
		@include text-default;
		white-space: nowrap;
	}
}

.wc {
	&-available-day {
		background-color: rgba($color-green, 0.15);
		border-radius: rem(2);
		border-top: rem(2) solid rgba($color-green, 0.3);
		border-bottom: rem(2) solid rgba($color-green, 0.3);
	}
}

.vuecal {
	box-shadow: none;

	&__title-bar {
		justify-content: flex-end;
		background-color: transparent;
		border: none;
		min-height: auto;
	}

	&__title {
		width: auto !important;
		flex: none !important;
		order: -1;
		margin-right: rem(24);
	}

	&__today-btn {
		order: -2;
		padding: 0;
		margin-right: rem(24);
		opacity: 0.3;
		@include text-default;

		@include defaultTransition(opacity);

		&:hover {
			opacity: 1;
		}
	}

	&__arrow {
		margin: 0;
		padding: 0;
		margin-top: rem(-$indent-arrows);
		margin-bottom: rem(-$indent-arrows);

		&--next {
			margin-right: rem(-$indent-arrows);
		}
	}

	&__weekdays-headings {
		margin-top: rem(32);
		margin-bottom: rem(4) !important;
		margin-bottom: 0;
		padding-right: 0 !important;
		padding-left: 0 !important;
		border-bottom: none;
	}

	&__body {
		overflow: visible;
	}

	&__bg {
		overflow: visible;
		border-bottom: none;
		background-color: $color-light;
	}

	&__heading {
		height: auto;
	}

	&__cell {
		&::before {
			border-color: $color-white !important;
		}

		&--selected  {
			background: none;
		}

		&--today {
			background-color: rgba($color-saphire, 0.15);
		}
	}

	&__time-column {
		margin-left: -3em;
	}

	&__time-cell {
		padding-right: rem(2);
	}

	&__time-cell-label {
		@include text-small;
		color: $color-dark;
		opacity: 0.3;
	}

	&__time-cell-line {
		&::before {
			border-color: $color-white !important;
		}
	}

	&__no-event {
		display: none;
	}

	&__event {
		background: transparent;
		padding: 1px;
		box-shadow: none !important;

		// Минимальная высота 30м
		min-height: rem(24);
	}

	&__now-line {
		color: $color-dark;
		opacity: 1;
		z-index: 3;

		&.slide-fade--left-leave-active,
		&.slide-fade--right-leave-active {
			opacity: 0;
		}

		&::before {
			background-color: $color-dark;
			border-radius: 50%;
			border: 1px solid $color-white;
			width: rem(9);
			height: rem(9);
			top: 0;
			transform: translate(-50%, -50%);
		}
	}
}
</style>
