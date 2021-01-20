<template>
	<div class="work-calendar">
		<client-only>
			<VueCal
				ref="vuecal"
				locale="ru"
				hide-view-selector
				:time-from="timeFrom"
				:time-to="timeTo"
				:disable-views="['years', 'year', 'month', 'day']"
				:snap-to-time="30"
				:special-hours="availableDaysNormalize"
				:drag-to-create-event="false"
				:events="records"
				editable-events
				:on-event-click="onEventClick"
				:overlaps-per-time-step="true"
				:drag-to-create-threshold="0"
				:timeCellHeight="calendarTimeCellHeight"
				@event-drop="onEventDrop">
				<template #title="{ view }">
					<p class="work-calendar__title">{{ view.startDate.format('MMMM YYYY') }}</p>
				</template>

				<template #arrow-prev>
					<Btn :button="buttonPrev"/>
				</template>

				<template #arrow-next>
					<Btn :button="buttonNext"/>
				</template>

				<template #weekday-heading="{ heading }">
					<WeekDayHeader
						:name="getWeekDay(+heading.date.format('d') - 1)"
						:number="+heading.date.format('D')"
						:active="isCurrentDay(heading.date)"/>
				</template>

				<template #event>
					<WorkCalendarEvent/>
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
import 'vue-cal/dist/vuecal.css';

import { convertToScalingPx } from '@/utils/convert';
import { equalDates, dateLocales } from '@/utils/dates';

let VueCal;
if (process.client) {
	VueCal = require('vue-cal');
	require('vue-cal/dist/drag-and-drop');
	require('vue-cal/dist/i18n/ru');
}

const AVAILABLE_DAY_CLASS = 'wc-available-day';

const MODE_RECORD = {
	id: 'record',
	text: 'Режим записи'
};

const MODE_AVAILABLE_DAY = {
	id: 'availableDay',
	text: 'Режим доступные дни'
}

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
			enableEventEdit: false,
			calendarTimeCellHeight: 48,
			availableDays: {
				1: { from: 13 * 60, to: 18 * 60 }
			},
			availableDaysAddDefaultText: 'Добавить свободные дни',
			records: [
				{
					start: '2021-01-19 14:00',
					end: '2021-01-19 17:30',
					title: 'Boring event',
					content: '<i class="icon material-icons">block</i><br>I am not draggable, not resizable and not deletable.',
					class: 'blue-event',
					editable: false,
					deletable: true,
					resizable: true,
					draggable: true
				},
				{
					start: '2021-01-20 14:00',
					end: '2021-01-20 17:30',
					title: 'Сосать',
					content: '<i class="icon material-icons">block</i><br>I am not draggable, not resizable and not deletable.',
					class: 'blue-event',
					editable: false,
					deletable: true,
					resizable: true,
					draggable: true
				}
			],
		}
	},

	computed: {
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
			return 10 * 60;
		},

		timeTo() {
			return 19 * 60;
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

			// Убираем availablesDays
			// Формируем из них events
			// Присваевываем events

			// Сделаем редактируемым
		},

		setOptionsRecordMode() {
			this.mode = this.modeRecord.id;
			this.modeToggleText = this.modeRecord.text;
		},

		createEventsAvailableDays(week) {
			let events;
			if (Array.isArray(week)) {

			} else if (typeof week === 'object') {
				events = this.createEventsAvailableDaysByObject(week);
			}

			return events;
		},

		createEventsAvailableDaysByObject(week) {
			for (const key in week) {
				const day = week[key];

				const event = this.createEventAvailableDayByObject(day);
			}
		},

		createEventAvailableDayByObject(timeline) {
			const eventDefault = {

			};

			const event = {
				start: timeline.from,
				end: timeline.to,
			}
		},

		// Получить полные доступные дни для доступных дней
		getAvailableDaysNormalize(week) {
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
			console.log('Event', event);
			// TODO:
		},

		onEventDrop(event) {
			console.log('Event drop', event);
			// TODO:
		},

		// Добавить доступные дни по умолчанию
		addDefaultAvailableDays() {
			// TODO:
			const defaultAvailableDay = {

			};

			for (const weekDayNumber of 7) {
				// Добавить день
			}
		},

		// Существует ли свободные дни на этой неделе
		getExistAvailableDays(from = this.$refs.vuecal.view.startDate, to = this.$refs.vuecal.view.endDate) {
			// TODO:
			return false;
		},

		isCurrentDay(value) {
			return equalDates(value, new Date());
		},

		getWeekDay(weekDayNumber) {
			return dateLocales.ru.days[weekDayNumber];
		}
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
		background-color: red;
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
	}
}
</style>
