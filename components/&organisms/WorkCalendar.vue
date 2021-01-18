<template>
	<div class="work-calendar">
		<client-only>
			<VueCal
				ref="vuecal"
				hide-view-selector
				:time-from="timeFrom"
				:time-to="timeTo"
				:time-step="30"
				:disable-views="['years', 'year', 'month', 'day']"
				:snap-to-time="30"
				:special-hours="availableDaysNormalize"
				:drag-to-create-event="false"
				:events="records"
				editable-events
				:on-event-click="onEventClick"
				:overlaps-per-time-step="true"
				:drag-to-create-threshold="0"
				@event-drop="onEventDrop">
			</VueCal>
		</client-only>

		<div class="work-calendar__footer">
			<div class="work-calendar__labels"></div>
			<div class="work-calendar__actions">
				<template v-if="mode === modeAvailableDay.id">
					<LinkAction
						v-if="visibleAddDefaultAvailableDays"
						:link="Object.assign({}, { tag: 'button' }, { text: availableDaysAddDefaultText })"
						@click.native="addDefaultAvailableDays"/>
				</template>

				<LinkAction
					:link="Object.assign({}, { tag: 'button' }, { text: modeToggleText })"
					@click.native="toggleMode"/>
			</div>
		</div>
	</div>
</template>

<script>
import LinkAction from '+/LinkAction';
import 'vue-cal/dist/vuecal.css';

let VueCal;
if (process.client) {
	VueCal = require('vue-cal');
	require('vue-cal/dist/drag-and-drop');
}

const AVAILABLE_DAY_CLASS = 'wc-available-day';

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
	},

	data: (ctx) => {
		const modeRecord = {
			id: 'record',
			text: 'Режим записи'
		};

		const modeAvailableDay = {
			id: 'availableDay',
			text: 'Режим доступные дни'
		};

		return {
			modeRecord,
			modeAvailableDay,
			modeToggleText: '',
			mode: modeRecord.id,
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
			return 17 * 60;
		},
	},

	created() {
		this.setOptionsByMode(this.mode);
	},

	methods: {
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

			// Убираем availablesDays
			// Формируем из них events
			// Присваевываем events

			// Сделаем редактируемым
		},

		setOptionsRecordMode() {
			this.mode = this.modeRecord.id;
			this.modeToggleText = this.modeRecord.text;
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
		},

		onEventDrop(event) {
			console.log('Event drop', event);
		},

		// Добавить доступные дни по умолчанию
		addDefaultAvailableDays() {
			const defaultAvailableDay = {

			};

			for (const weekDayNumber of 7) {
				// Добавить день
			}
		},

		// Существует ли свободные дни на этой неделе
		getExistAvailableDays(from = this.$refs.vuecal.view.startDate, to = this.$refs.vuecal.view.endDate) {
			return false;
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
}

.wc {
	&-available-day {
		background-color: red;
	}
}

.vuecal {

}
</style>
