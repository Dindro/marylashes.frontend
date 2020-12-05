import Vue from 'vue';
import { beforeShow as beforeShowRecord } from './components/record';

const components = [
	{
		name: '#record',
		component: () => import('&/Record/Record.vue'),
		propComponentDisable: true,
		propModal: false,
		beforeShow: beforeShowRecord,
	},
	{
		name: '#review',
		component: () => import('&/ReviewCreate.vue'),
		propComponentDisable: false,
		propModal: { size: 'md' },
		beforeShow: false,
	},
];

export default (ctx, inject) => {
	ctx.app.router.beforeEach(async (to, from, next) => {
		const component = components.find(component => to.hash === component.name);

		// Если нет ни одной модалки
		if (!component) {
			next();
			return;
		}

		next({ name: to.name });

		// Проверка что открыта модалка
		const status = ctx.app.router.app.$modal.getStatus(component.name);
		if (status && status.open) {
			next(false);
			return;
		}

		await Vue.nextTick();

		// Если есть функция до открывания модалки
		if (component.beforeShow && typeof component.beforeShow === 'function')
			component.beforeShow.call(ctx, to.query);

		// Открываем модалку
		const props = [
			// Динамический компонент
			component.component,

			// Параметры для динамического компонента
			component.propComponentDisable ? {} : to.query,

			// Параметры для модалки
			{ name: component.name, ...component.propModal }
		];

		ctx.app.router.app.$modal.show(...props);
	});
};
