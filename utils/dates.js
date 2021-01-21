const ru = {
	days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
	months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
	monthsSmall: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
};

const dateLocales = {
	ru,
};

const getWeekDayIndex = (date = new Date()) => {
	const map = {
		1: 0,	// Пн
		2: 1,
		3: 2,
		4: 3,
		5: 4,
		6: 5,
		0: 6,	// Вс
	};

	return map[date.getDay()];
};

/**
 * Получить день с которой начинается неделя
 * @param {Date} date
 */
const getStartWeekDay = (date = new Date()) => {
	const day = date.getDate();
	const weekDay = getWeekDayIndex(date);
	const startWeekDay = new Date(date.getTime());
	startWeekDay.setDate(day - weekDay);
	return startWeekDay;
};

const equalDates = (date, dateSome) => {
	return date.getFullYear() === dateSome.getFullYear()
		&& date.getMonth() === dateSome.getMonth()
		&& date.getDate() === dateSome.getDate();
};

/**
 * Получить время в часах и в минутах
 * @param {Number} hour часы, могут быть и дробные
 * @returns {Object} { h, m }
 */
const getTime = (hour) => {
	const balance = hour % 1;
	const h = (hour - balance);
	const m = balance * 60;
	return { h, m };
};

// Получить время в формате HH:MM
const getCompleteTime = (hour, minutes = 0) => {
	hour = hour.toString().length === 1 ? `0${hour}` : hour;
	minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
	return `${hour}:${minutes}`;
};

const formatDayMonthTime = (date = new Date()) => {
	const month = dateLocales.ru.monthsSmall[date.getMonth()];
	const day = date.getDate();
	const time = getCompleteTime(date.getHours(), date.getMinutes());
	return `${day} ${month} ${time}`;
};

/**
 * Получить часы и минуты по количеству минут
 * @param {Number} count Количество минут
 */
const getTimeByMinutesCount = (count) => {
	const hour = +(count / 60).toFixed();
	const minutes = count % 60;

	return {
		hour,
		minutes,
	};
};

//
const getMinutesCount = (date = new Date()) => {
	const hours = date.getHours();
	const minutes = date.getMinutes();
	return hours * 60 + minutes;
};

export {
	dateLocales,
	getWeekDayIndex,
	getStartWeekDay,
	getTime,
	getCompleteTime,
	equalDates,
	formatDayMonthTime,
	getTimeByMinutesCount,
	getMinutesCount,
}
