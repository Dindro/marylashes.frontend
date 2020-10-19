<template>
	<div class="week-calendar">
		<div class="week-calendar__header">
			<week-day-header class="week-calendar__header-item" v-for="(day, index) in week" :key="index" :name="day.name" :number="day.number" :active="day.active"></week-day-header>
		</div>
		<div class="week-calendar__days" @mouseleave="clearHover" ref="days">
			<div class="week-calendar__day" v-for="(day, index) in week" :key="index">
				<div class="week-calendar__hour" v-for="hour in hours" :key="hour" v-bind="!index && { 'data-hour': getCompleteTime(hour) }">
					<div class="week-calendar__half week-calendar__half--top"
						:class="getClassCell(day, hour, 0.5)"
						:ref="getCellRefName(day, hour)"
						@mouseenter="renderHover($event, day, hour)"
						@click="selectDate($event, day, hour)"
					></div>
					<div class="week-calendar__half week-calendar__half--bottom"
						:class="getClassCell(day, hour + 0.5, 0.5)"
						:ref="getCellRefName(day, hour + 0.5)"
						@mouseenter="renderHover($event, day, hour + 0.5)"
						@click="selectDate($event, day, hour + 0.5)"
					></div>
				</div>
			</div>

			<week-meet
				v-for="(meet, index) in meets"
				:key="'meet' + index"
				:type="getMeetTypes(meet)"
				:styling="meet.style"
				:title="meet.record ? text.record : text.free"
			></week-meet>
			<week-meet v-if="selectedMeet" :type="[ 'hover', ...selectedMeet.opacify ? ['opacify'] : []]" :styling="selectedMeet.style" :title="selectedMeet.title" :time="selectedMeet.time"></week-meet>
			<week-meet v-if="hover" :type="[ 'hover', ...hover.record ? ['record'] : []]" :styling="hover.style" :title="hover.title" :time="hover.time"></week-meet>

			<week-time v-if="time" :styling="time.style"></week-time>
		</div>
	</div>
</template>

<script>
import { isDesktop } from '~/utils/breakpoints';
import { equalDates, getTime, getCompleteTime } from '~/utils/dates';
import throttle from 'raf-throttle';

import WeekDayHeader from './WeekDayHeader';
import WeekMeet from './WeekMeet';
import WeekTime from './WeekTime';

export default {
	components: {
		WeekDayHeader,
		WeekMeet,
		WeekTime,
	},

	props: {
		hours: Array,
		week: Array,
		meetsWeek: Array,
		duration: Number,
		text: Object,
		selectedDate: [ Date, String ],
	},

	data: () => ({
		hover: false,
		selected: false,
		time: false,
		meetsHelper: [],
	}),

	computed: {
		// Собирается из данных meetsWeek + meetsHelper (внутренний)
		meets() {
			return this.meetsWeek.map((meet, i) => {
				const meetHelper = this.meetsHelper[i] || {};
				return Object.assign({}, meet, meetHelper);
			});
		},

		// Собирается из selectedDate + selected (внутренний)
		selectedMeet() {
			if (!(this.selectedDate instanceof Date)) return false;
			if (!this.selected) return false;

			const existDay = this.week.filter(day => equalDates(day.date, this.selectedDate)).length;
			if (!existDay) return false;

			const date = this.selectedDate;
			return Object.assign({}, this.selected, { date });
		},

		// Цифра последнего часа
		lastHours() {
			return parseInt(this.hours[this.hours.length - 1] + 1);
		},
	},

	methods: {
		// Рендер ховера
		renderHover(e, day, hour) {
			const duration = this.duration;
			if (duration <= 0) return;

			// Если ховер на последний элемент, то высчитываем элемент
			const isLast = hour + duration > this.lastHours;
			hour = isLast ? this.lastHours - duration : hour;

			const half = isLast ? this.getCellElement(day, hour) : e.target;

			// Поиск мит пересекающих с hover
			const crossMeets = this.getMeetsCrossByDay(day, hour, duration);
			this.meets.forEach(meet => this.$set(meet, 'hovered', false));
			crossMeets.forEach(meet => this.$set(meet, 'hovered', true));

			this.selected && this.selectedMeetCross(day, hour, duration);

			// Вставка координат
			const time = getTime(hour);
			const date = new Date(day.date.getTime());
			date.setHours(time.h, time.m);

			const style = this.getMeetStylePosition(half, duration);
			const hover = {
				style,
				date,
			};

			// Вставка текста
			// Поиск записей пересекающих c hover
			const crossRecords = crossMeets.filter(meet => meet.record);
			hover.record = crossRecords.length !== 0;
			hover.title = !hover.record ? ( isDesktop() ? this.text.hover : this.text.hover_adaptive ) : this.text.hover_record;

			if (duration >= 1) {
				const from = time;
				const to = getTime(hour + duration);
				hover.time = `${getCompleteTime(from.h, from.m)} - ${getCompleteTime(to.h, to.m)}`;
			}

			this.$set(this, 'hover', hover);
		},

		// Очищаем ховер
		clearHover() {
			this.hover = false;
			this.selected && this.$set(this.selected, 'opacify', false);
		},

		// Получаем half элемент
		getCellElement(day, hour) {
			const name = this.getCellRefName(day, hour);
			return this.$refs[name][0];
		},

		// Получаем название для half элемент
		getCellRefName(day, hour) {
			return `half-${day.date.getDate()}-${hour}`;
		},

		// Выбираем
		async selectDate() {
			if (!this.hover) return;
			if (this.hover.record) return;

			const date = new Date(this.hover.date.getTime());
			this.$emit('select', date);
			this.hover = false;

			await this.$nextTick();
			this.renderSelectedMeet();
		},

		// Высчитываем стили выбранного мероприятия
		renderSelectedMeet() {
			if (!(this.selectedDate instanceof Date)) return false;

			const existDay = this.week.filter(day => equalDates(day.date, this.selectedDate)).length;
			if (!existDay) return;

			const date = this.selectedDate;
			const duration = this.duration;
			const minutes = date.getMinutes();
			let hour = date.getHours() + (minutes / 60);

			// Если ховер на последний элемент, то высчитываем элемент
			const isLast = hour + duration > this.lastHours;
			hour = isLast ? this.lastHours - duration : hour;

			// Style
			const element = this.getCellElement({ date }, hour);
			const style = this.getMeetStylePosition(element, duration);

			// Text
			const title = this.text.record_my;
			let time;
			if (duration >= 1) {
				const from = getTime(hour);
				const to = getTime(hour + duration);
				time = `${getCompleteTime(from.h, from.m)} - ${getCompleteTime(to.h, to.m)}`;
			}

			const selected = {
				style,
				title,
				time,
			};

			this.$set(this, 'selected', selected);
		},

		// Обновляем рендер выбора
		updateSelectedMeet() {
			this.renderSelectedMeet();
		},

		// Действия когда пересекается ховер с выбором
		selectedMeetCross(day, hour, duration) {
			if (!this.selectedMeet) return;

			if (!equalDates(day.date, this.selectedMeet.date)) {
				this.selected.opacify && this.$set(this.selected, 'opacify', false);
				return;
			};

			const meet = { duration: this.duration, date: this.selectedMeet.date };
			this.isMeetCross(hour, duration, meet)
				&& this.$set(this.selected, 'opacify', true)
				|| this.$set(this.selected, 'opacify', false);
		},

		// Получить события которые пересекаются в одном дне
		getMeetsCrossByDay(day, hour, duration, meets = this.meets) {
			const recordsByDay = this.getMeetsByDay(day, meets);
			const recordsCross = this.getMeetsCross(hour, duration, recordsByDay);
			return recordsCross;
		},

		// Получить события которые пересекаются
		getMeetsCross(hour, duration, meets) {
			return meets.filter(meet => this.isMeetCross(hour, duration, meet));
		},

		// Встреча пересекатеся
		isMeetCross(hour, duration, meet) {
			const meetMinutes = meet.date.getMinutes() * 100 / 60 / 100;
			const meetHours = meet.date.getHours() + meetMinutes;
			const meetDuration = meet.duration;
			return (meetHours + meetDuration <= hour || hour + duration <= meetHours) === false;
		},

		// Получить все встречи данного дня
		getMeetsByDay(day, meets) {
			return meets.filter(meet => equalDates(meet.date, day.date));
		},

		// Получить встречи задонного промежутка
		getMeetsByHour(hour, duration, meets) {
			return meets.filter(meet => {
				const meetMinutes = meet.date.getMinutes() * 100 / 60 / 100;
				const meetHours = meet.date.getHours() + meetMinutes;
				const meetDuration = meet.duration;

				// Проверка на часы
				return meetHours <= hour && hour + duration <= meetHours + meetDuration;
			});
		},

		// Получить класс для ячейки
		getClassCell(day, hour, duration = 1) {
			const meetsByDay = this.getMeetsByDay(day, this.meets);
			const meetsByHour = this.getMeetsByHour(hour, duration, meetsByDay);

			const free = meetsByHour.some(meet => meet.free);
			const record = meetsByHour.some(meet => meet.record);
			return {
				'is-free': free,
				'is-record': record,
			};
		},

		// Расчитываем позицию встречи
		getMeetStylePosition(half, duration) {
			// Получаем высоту
			const { offsetHeight: halfHeight } = half;
			const height = duration * halfHeight * 2;

			// Получаем ширину
			const { offsetWidth: width } = half;

			// Получаем координаты
			const container = this.$refs.days;
			const { top: elementTop, left: elementLeft } = container.getBoundingClientRect();
			const { top: halfTop, left: halfLeft } = half.getBoundingClientRect();
			const left = halfLeft - elementLeft;
			const top = halfTop - elementTop;

			// Вставка коориданта
			return {
				width: `${width}px`,
				height: `${height}px`,
				left: `${left}px`,
				top: `${top}px`,
			};
		},

		// Получить массив типов для отображение week-meet
		getMeetTypes(meet) {
			return [
				...meet.free ? ['free'] : [],
				...meet.record ? ['record'] : [],
				...meet.hovered ? ['hovered'] : []
			];
		},

		// Обновляем рендер встрея
		updateMeetStyle() {
			this.meets.forEach((meet, i) => {
				const half = this.getCellElement(meet, meet.date.getHours());
				const style = this.getMeetStylePosition(half, meet.duration);

				this.$set(this.meetsHelper, i, { style });
			});
		},

		// Обновляем время
		updateTime() {
			const disableTime = () => this.$set(this, 'time', false);

			// Отображен ли текущий день в календаре
			const currentDate = new Date();
			const existCurrentDay = this.week.some(day => equalDates(day.date, currentDate));
			if (!existCurrentDay) return disableTime();

			// Отображен ли текущий час в календаре
			const h = currentDate.getHours();
			const m = currentDate.getMinutes();
			const existCurrentHours = this.hours.indexOf(h) !== -1;
			if (!existCurrentHours) return disableTime();

			// Получаем элемент и стили для него
			const element = this.getCellElement({ date: currentDate }, h);
			if (!element) return disableTime();

			// Корректируем стили
			const style = this.getMeetStylePosition(element, 1);
			const top = parseFloat(style.top);
			const height = parseFloat(style.height);

			style.top = `${top + (m * height / 60)}px`;
			delete style.height;

			this.$set(this, 'time', { style });
		},

		// Обновляем рендеры
		updateRender() {
			this.updateMeetStyle();
			this.updateTime();
			this.updateSelectedMeet();
		},

		// Получить завершенное время (используется в шаблоне)
		getCompleteTime,
	},

	async mounted() {
		await this.$nextTick();
		this.updateRender();

		const updateRenderThrottle = throttle(this.updateRender);
		window.addEventListener('resize', updateRenderThrottle);

		// Обновляем каждые 3 минуты
		const intervalId = setInterval(this.updateTime.bind(this), 1000 * 60 * 3);
		this.$once('hook:beforeDestroy', () => {
			clearInterval(intervalId);
			window.removeEventListener('resize', updateRenderThrottle);
		});
	},

	watch: {
		async week(value) {
			await this.$nextTick();
			this.updateRender();
		},

		async meetsWeek() {
			await this.$nextTick();
			this.updateRender();
		}
	}
}
</script>

<style lang="scss">
.week-calendar {
	&__header {
		display: flex;
		margin-bottom: rem(4);
	}

	&__header-item {
		flex: 1;
	}

	&__days {
		display: flex;
		position: relative;
	}

	&__day {
		flex: 1;
	}

	&__hour {
		height: 1px;
		min-height: rem(50);
		position: relative;

		&::before {
			content: '';
			position: absolute;
			top: 1px;
			left: 1px;
			right: 1px;
			bottom: 1px;
			border-radius: rem(2);
			background-color: $color-light;
		}

		&::after {
			content: attr(data-hour);
			position: absolute;
			right: calc(100% + 2px);
			top: 1px;
			opacity: 0.3;
			@include text-small;
		}
	}

	&__half {
		position: relative;
		height: 50%;

		&::before {
			content: '';
			position: absolute;
			top: 1px;
			left: 1px;
			right: 1px;
			bottom: 0;
		}

		&--top::before {
			border-top-left-radius: rem(2);
			border-top-right-radius: rem(2);
		}

		&--bottom::before {
			bottom: 1px;
			top: 0;
			border-bottom-left-radius: rem(2);
			border-bottom-right-radius: rem(2);
		}

		&.is-free::before {
			background-color: $color-green-light;
		}

		&.is-record::before {
			background-color: $color-red-light;
		}
	}
}
</style>
