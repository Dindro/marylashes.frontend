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
				:snap-to-time="30"
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
			todayVisible: false,
			todayText: 'Перейти в текующую неделю',
			availableDaysAddDefaultText: 'Добавить свободные дни',
			availableDays: {
				6: { from: 13 * 60, to: 18 * 60 }
			},
			records: [
				{
					id: 10,
					start: '2021-01-19 14:00',
					end: '2021-01-19 17:30',
					status: 'report',
					user: {
						name: 'Мария Ижуткина',
					},
				},
				{
					id: 11,
					start: '2021-01-20 14:00',
					end: '2021-01-20 17:30',
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
			const events = this[this.eventsSourceName];

			const editable = this.modeAvailableDay.id === this.mode || this.enableEventEdit;

			const setting = {
				deletable: false,
				editable: false,
				draggable: editable,
				resizable: editable,
			};

			return events.map(event => Object.assign({}, event, setting));
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
			const { start, end } = event;

			return {
				from: getMinutesCount(start),
				to: getMinutesCount(end),
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
			const { from, to } = timeline;
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
			console.log('Event click', event);
			// TODO:
		},

		onEventDrop(e) {
			process.env.NODE_ENV === 'development' && console.log('Event drop', e);
			const { event } = e;

			const { id } = event;
			if (!id) return;

			const eventBase = this.findEvent(id);
			if (!eventBase) return;

			eventBase.start = event.start;
			eventBase.end = event.end;
			// TODO:
		},

		onViewChange(event) {
			const { startDate, endDate } = event;
			const now = new Date();
			this.todayVisible = (startDate <= now && now <= endDate) === false;
		},

		onEventDurationChange(e) {
			process.env.NODE_ENV === 'development' && console.log('Event duration change', e);
			const { event } = e;

			const { id } = event;
			if (!id) return;

			const eventBase = this.findEvent(id);
			if (!eventBase) return;

			const { endTimeMinutes } = event;

			// Проверка на минимальную длину
			if (this.timeTo < endTimeMinutes) {
				const time = getTimeByMinutesCount(this.timeTo);
				let date = new Date(event.end.getTime());
				date = new Date(date.setHours(time.hour, time.minutes, 0 ,0));

				eventBase.end = date;
			} else {
				eventBase.end = event.end;
			}
		},

		findEvent(id) {
			return this[this.eventsSourceName].find(event => event.id === id);
		},

		onEventDragCreate(event) {
			console.log('Event drag create', event);
			// TODO: Проверка на минимальную длину
			// TODO: Назначаем small или large
		},

		onEventDelete() {
			console.log('Event delete');
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
