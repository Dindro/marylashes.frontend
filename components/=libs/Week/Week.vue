<template>
	<div class="week" :class="[ preloader && 'week--preloader' ]">
		<div class="week__control">
			<button v-show="!existCurrentDay" @click="gotoToday" class="week__today">{{ text.today_action }}</button>
			<p class="week__current">{{ currentDateText }}</p>
			<nav-arrows :nav_arrows="nav_arrows" @prev="prevWeek" @next="nextWeek"></nav-arrows>
		</div>
		<week-calendar class="week__content" :week="week" :hours="hours" :duration="duration" :selectedDate="selectedDate" :meetsWeek="meetsWeek" :text="text" @select="date => $emit('select', date)"></week-calendar>
		<div class="week__footnote">
			<week-point-list class="week__points" :items="points"></week-point-list>
			<slot name="footnote"></slot>
		</div>
		<div class="week__preloader">
			<spinner></spinner>
		</div>
	</div>
</template>

<script>
import WeekPointList from './WeekPointList';
import WeekCalendar from './WeekCalendar';
import NavArrows from '+/NavArrows';
import Spinner from '+/Spinner';

import { dateLocales, getStartWeekDay, equalDates } from '@/utils/dates';

export default {
	components: {
		WeekPointList,
		WeekCalendar,
		NavArrows,
		Spinner,
	},
	props: {
		timeFrom: {
			type: Number,
			default: 10,
			validator: value => value >= 0 && value <= 22,
		},
		timeTo: {
			type: Number,
			default: 18,
			validator: value => value >= 1 && value <= 23,
		},
		duration: Number,
		meets: Array,
		text: Object,
		selectedDate: [ String, Date ],
		loadMeets: Function,
	},

	data: (ctx) => {
		const currentDate = new Date();
		currentDate.setSeconds(0, 0);
		const startWeekDay = getStartWeekDay(currentDate);

		return {
			currentDate,
			currentDateText: '',
			startWeekDay,
			week: [],
			preloader: false,
			laodStack: [],
			points: [
				{ text: ctx.text.free, color: 'green' },
				{ text: ctx.text.record_my, color: 'violet' },
				{ text: ctx.text.record_block, color: 'dark', }
			],
			nav_arrows: {
				color: 'dark',
				prevDisabled: false,
			},
		}
	},

	computed: {
		// Массив часов
		hours() {
			const timesFrom = this.meetsWeek.map(meet => meet.date.getHours());
			const timeFrom = Math.min(...timesFrom, this.timeFrom);

			const timesTo = this.meetsWeek.map(meet => {
				const h = meet.date.getHours();
				const d = meet.duration;
				const common = h + d;
				return common % 1 ? common - (common % 1) : common;
			});
			const timeTo = Math.max(...timesTo, this.timeTo);

			const hours = [];
			for (let h = timeFrom; h <= timeTo; h++) {
				hours.push(h);
			}
			return hours;
		},

		// Содержит ли неделя текущий день
		existCurrentDay() {
			return this.week.some(day => day.active);
		},

		// Массив встреч для текущей недели
		meetsWeek() {
			return this.meets
				.filter(({ date }) => {
					return this.week.some(day => equalDates(day.date, date));
				})
				// Передаем свойство free, что это свободная запись
				.map(meet => Object.assign({}, meet, { free: true }))
		}
	},

	methods: {
		prevWeek() {
			this.startWeekDay.setDate(this.startWeekDay.getDate() - 7);
			this.changeCurrentDateText();
			this.updateWeek();
		},

		nextWeek() {
			this.startWeekDay.setDate(this.startWeekDay.getDate() + 7);
			this.changeCurrentDateText();
			this.updateWeek();
		},

		changeCurrentDateText() {
			const month = dateLocales.ru.months[this.startWeekDay.getMonth()];
			const year = this.startWeekDay.getFullYear();
			this.currentDateText = `${month} ${year}`;
		},

		// Обновляем неделю
		async updateWeek() {
			const week = [];
			for (let i = 0; i < 7; i++) {
				const date = new Date(this.startWeekDay.getTime());
				date.setDate(date.getDate() + i);

				week.push({
					date,
					number: date.getDate(),
					name: dateLocales.ru.days[i],
					active: equalDates(this.currentDate, date),
				});
			}
			this.week = week;

			await this.getMeets();
		},

		// Получаем миты, и добавляем недели в базу что их загрузили
		async getMeets() {
			// Получаем цифры времени
			const date = new Date(this.startWeekDay.getTime());
			date.setHours(0, 0, 0, 0);
			const time = date.getTime();

			// Проверка в стеке загруженных
			const isExist = this.laodStack.indexOf(time) !== -1;
			if (isExist) return;

			this.preloader = true;
			await this.loadMeets(this.startWeekDay);
			this.laodStack.push(time);

			this.preloader = false;
		},

		gotoToday() {
			const date = new Date();
			date.setSeconds(0, 0);
			this.startWeekDay = getStartWeekDay(date);
			this.changeCurrentDateText();
			this.updateWeek();
		},

		checkBound() {
			const startWeekCurrentDay = getStartWeekDay(this.currentDate);
			return equalDates(startWeekCurrentDay, this.startWeekDay);
		},

		enableBound() {
			this.nav_arrows.prevDisabled = true;
		},

		disableBound() {
			this.nav_arrows.prevDisabled = false;
		},
	},

	created() {
		this.changeCurrentDateText();
		this.updateWeek();

		if (this.checkBound()) this.enableBound();
	},

	watch: {
		week() {
			if (this.checkBound()) this.enableBound();
			else this.disableBound();
		}
	}
}
</script>

<style lang="scss">
.week {
	$b: #{&};
	position: relative;

	@include media-breakpoint-down(sm) {
		text-align: center; // Для control
	}

	&--preloader {
		pointer-events: none;

		#{$b}__preloader {
			opacity: 1;
		}
	}

	&__control {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		@include media-breakpoint-down(sm) {
			display: inline-block;
			position: relative;
			min-width: rem(112);
		}

		.nav-arrows {
			@include media-breakpoint-up(md) {
				margin-right: rem(-$indent-arrows);
				margin-top: rem(-$indent-arrows);
				margin-bottom: rem(-$indent-arrows);
			}

			@include media-breakpoint-down(sm) {
				display: block;

				&__button {
					position: absolute;
					top: 0;
					bottom: 0;
					margin: auto;

					$position: calc(100% + #{rem(16)});

					&--prev {
						right: $position;
					}

					&--next {
						left: $position;
					}
				}
			}
		}

		> * + * {
			@include media-breakpoint-up(md) {
				margin-left: rem(24);
			}
		}
	}

	&__content {
		margin-top: rem(32);
	}

	&__footnote {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: rem(16);

		@include media-breakpoint-down(md) {
			align-items: stretch;
			flex-direction: column;
		}

		@include media-breakpoint-down(sm) {
			margin-top: rem(8);
		}
	}

	&__current {
		@include text-default;
	}

	&__preloader {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		opacity: 0;

		@include defaultTransition(opacity);
	}

	&__today {
		border: none;
		padding: 0;
		margin: 0;
		outline: none !important;
		opacity: 0.3;
		background: none;
		@include text-default;
		@include defaultTransition(opacity);

		@include media-breakpoint-down(sm) {
			display: none;
		}

		&:hover {
			opacity: 1;
		}
	}
}
</style>
