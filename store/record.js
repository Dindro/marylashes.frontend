import Vue from 'vue';
import { formatDayMonthTime } from '@/utils/dates';
import servicesStorage from '@/storage/services';
import recordDateStorage from '@/storage/recordDate';
import meetsStorage from '@/storage/meets';
import fieldsStorage from '@/storage/fields';

export const state = () => ({
	services: [],
	userMeets: [],
	meets: [],
	selectedDate: null,
	text: {},
	contacts: {},
	result: {},
});

export const getters = {
	PRICE: (state) => {
		return state.services.reduce((price, service) => {
			if (service.selected && service.price) return price + service.price;
			return price;
		}, 0);
	},
	DURATION: (state, getters) => {
		// Если не выбрано ничего и есть помощь, то возвращаем оценку помощи, иначе не учитываем
		const HELP_ID = 'HELP';

		const help = getters.SELECTED_SERVICES.find(service => service.view_id === HELP_ID);
		if (help && getters.SELECTED_SERVICES.length === 1) return help.duration;

		return getters.SELECTED_SERVICES.reduce((duration, service) => {
			if (service.duration && service.view_id !== HELP_ID) return duration + service.duration;
			return duration;
		}, 0);
	},
	SELECTED_SERVICES: state => state.services.filter(service => service.selected),
	SELECTED_SERVICES_ID: (state, getters) => getters.SELECTED_SERVICES.map(service => service.view_id),
	SELECTED_DATE_TEXT: (state) => {
		if (typeof state.selectedDate === 'string') {
			switch (state.selectedDate) {
				case 'INDIVIDUAL':
				default:
					return state.text.date.individual;
			}
		}

		const date = state.selectedDate;
		if (date instanceof Date) {
			return formatDayMonthTime(date);
		}

		return '';
	},
	PREV_MEETS: (state) => {
		const current = Date.now();
		return state.userMeets.filter(meet => meet.date < current);
	},
	NEXT_MEETS: (state) => {
		const current = Date.now();
		return state.userMeets
			.filter(meet => typeof meet.date === 'string' || meet.date > current)
			.map(meet => meet.date === 'INDIVIDUAL' ? Object.assign({}, meet, { date: state.text.date.individual }) : meet);
	},
};

export const mutations = {
	SET_SERVICES: (state, services) => state.services = services,
	DISELECT_SERVICES: (state, services) => services.forEach((service) => Vue.set(service, 'selected', false)),
	SET_SELECT_SERVICE: (state, { service, value }) => Vue.set(service, 'selected', value),
	SET_TEXT: (state, text) => state.text = text,
	ADD_MEETS: (state, meets) => {
		meets.forEach(meet => meet.date = new Date(meet.date));
		state.meets.push(...meets);
	},
	SET_SELECT_DATE: (state, date) => state.selectedDate = date,
	ADD_USER_MEETS: (state, meets) => state.userMeets.push(...meets),
	SET_CONTACTS: (state, contacts) => {
		[...contacts.info, ...contacts.socials].forEach(field => field.value = field.hasOwnProperty('value') ? field.value : '');
		[...contacts.checkboxes].forEach(field => field.value = field.hasOwnProperty('value') ? field.value : false);
		state.contacts = contacts;
	},
	SET_CONTACTS_FIELD: (state, { field, value }) => field.value = value,
	SET_RESULT: (state, result) => state.result = result,
};

export const actions = {
	init({ commit }, req) {
		const { services, text, contacts } = req;
		commit('SET_SERVICES', services);
		commit('SET_TEXT', text);
		commit('SET_CONTACTS', contacts);
	},

	load({ dispatch }) {
		dispatch('loadSelectedServices');
		dispatch('loadSelectedDate');
		dispatch('loadUserMeets');
		dispatch('loadContactsFields');
		dispatch('watchDuration');
	},

	watchDuration({ state, getters, dispatch }) {
		const unwatchDuration = this.watch(
			() => getters.DURATION,
			(value) => {
				// Проверка на дату
				if (state.selectedDate instanceof Date) dispatch('selectDate', null);
			},
		);
	},

	selectService({ state, commit }, service) {
		if (!service) {
			process.env.NODE_ENV === 'development' && console.info('Service is empty');
			return;
		}

		if (service.selected) {
			commit('SET_SELECT_SERVICE', { service, value: false });
			servicesStorage.remove(service);
			return;
		}

		const NOT_VIEWS_ID = ['CLEAR', 'HELP'];

		if (NOT_VIEWS_ID.indexOf(service.view_id) === -1) {
			// Приницип работы radiobutton
			// Получаем только объемы
			const views = state.services.filter((service) => NOT_VIEWS_ID.indexOf(service.view_id) === -1);

			// Устанавливаем для всех false
			commit('DISELECT_SERVICES', views);
			servicesStorage.remove(views);
		}

		// Устанавливаем что он выбран
		commit('SET_SELECT_SERVICE', { service, value: true });
		servicesStorage.add(service);
	},

	loadSelectedServices({ commit, state }) {
		const values = servicesStorage.get();
		const services = state.services.filter(service => values.indexOf(service.view_id) !== -1);
		services.forEach(service => commit('SET_SELECT_SERVICE', { service, value: true }));
	},

	selectDate({ commit }, date) {
		commit('SET_SELECT_DATE', date);
		recordDateStorage.add(date);
	},

	async loadSelectedDate({ commit, state }) {
		const value = recordDateStorage.get();
		if (value instanceof Date) {
			// Проверяем актуальна ли дата сейчас
			const current = new Date();
			if (current >= value) {
				process.env.NODE_ENV === 'development' && console.info('Выбранная дата из localStorage устаревшая');
				return;
			};

			// Проверяем стоит ли выбранная дата на СВОБОДНО
			// Сделать запрос на сервер - актуальна ли дата

			let existOnFree;
			try {
				const options = {
					duration: state.duration,
					time: value.getTime(),
					exist: 'free',
				};

				const optionsAxios = {
					timeout: 2000,
				};

				const res = await this.$provide.meet.getExist(options, optionsAxios);
				existOnFree = res.data;
			} catch (err) {
				console.warn(err);
				existOnFree = false;
			}

			if (!existOnFree) return;
		}

		commit('SET_SELECT_DATE', value);
	},

	async loadUserMeets({ commit }) {
		// Структура в localStorage
		// id
		// price
		// views
		// date
		// duration

		// Получаем списки встреч с устройства
		const userMeets = meetsStorage.get();

		// Получаем текущую дату
		const currentDate = new Date();
		const current = currentDate.getTime();

		// Получаем дату год назад (чтобы удалить прошлые)
		const COUNT_YEAR_AGO = 1;
		const yearagoDate = new Date(current);
		yearagoDate.setFullYear(yearagoDate.getFullYear() - COUNT_YEAR_AGO);
		const yearago = yearagoDate.getTime();

		// Распределяем встречи
		let prevUserMeets = [];
		let nextUserMeets = [];
		for (const meet of userMeets) {
			// Будущие встречи
			if (meet.date === 'string' || meet.date > current) nextUserMeets.push(meet);
			// Прошлые встречи за год
			else if (meet.date > yearago) prevUserMeets.push(meet);
			// Удаляем встречи
			else meetsStorage.remove(meet.id);
		}
		const nextUserMeetsId = nextUserMeets.map(meet => meet.id);

		// Получаем по id-никам с сервера полноценные миты
		let serverUserMeets = [];
		if (nextUserMeetsId.length) {
			try {
				const res = await this.$provide.meet.get({ ids: nextUserMeetsId });
				serverUserMeets = res.data;
			} catch (err) {
				console.log('Load user meets: ', err);
			}
		}

		// Дозаполняем серверные встречи
		if (serverUserMeets && serverUserMeets.length) {
			const meets = [];

			nextUserMeets.forEach(meet => {
				const findedMeet = serverUserMeets.find(m => m.id === meet.id);
				// Если не нашли его здесь - удаляем с localStorage
				findedMeet ? meets.push(findedMeet) : meetsStorage.remove(meet.id);
			});

			// Сохраняем данные полученные с сервера
			meetsStorage.update(meets);

			nextUserMeets = meets;
		}

		const meets = [...nextUserMeets, ...prevUserMeets];
		commit('ADD_USER_MEETS', meets);
	},

	setContactsField({ commit }, { field, value }) {
		commit('SET_CONTACTS_FIELD', { field, value });

		if (!field.save || !field.name) return;

		fieldsStorage.add(value, 'RECORD', field.name);
	},

	loadContactsFields({ state, commit }) {
		const { info, socials, checkboxes } = state.contacts;
		[...info, ...socials, ...checkboxes].forEach(field => {
			if (!field.save || !field.name ) return;

			let value = fieldsStorage.get('RECORD', field.name);

			if (value === null) value = '';
			if (field.checkbox) value = value === 'true';

			commit('SET_CONTACTS_FIELD', { field, value });
		});
	},

	resetSelectedData({ commit, dispatch, state }) {
		commit('DISELECT_SERVICES', state.services);
		servicesStorage.removeAll();
		dispatch('selectDate', null);
	},
};
