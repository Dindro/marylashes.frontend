import Vue from 'vue';
import { modalBeforeShow as modalBeforeShowRecord } from './components/record';

const components = [
	{
		name: '#record',
		component: () => import('&/Record/Record.vue'),
		componentProp: false,
		componentPropApi: false,
		modalProp: false,
		modalBeforeShow: modalBeforeShowRecord,
	},
	{
		name: '#review',
		component: () => import('&/ReviewCreate.vue'),
		componentProp: false,
		componentPropApi: 'review-create',
		modalProp: { size: 'md' },
		modalBeforeShow: false,
	},
];

async function getComponentProp(component) {
	if (component.componentProp) {
		return component.componentProp;
	}

	if (component.componentPropApi) {
		try {
			const res = await this.$provide.component.get(component.componentPropApi);
			return res.data;
		} catch (err) {
			return false;
		}
	}

	return false;
};

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
		if (component.modalBeforeShow && typeof component.modalBeforeShow === 'function')
			component.modalBeforeShow.call(ctx, to.query);

		// Открываем модалку
		const props = [
			// Динамический компонент
			component.component,

			// Параметры для динамического компонента
			await getComponentProp.call(ctx, component),

			// Параметры для модалки
			{ name: component.name, ...component.modalProp }
		];

		ctx.app.router.app.$modal.show(...props);
	});
};
