import Vue from 'vue';
import { hookBeforeShow as hookBeforeShowRecord } from './components/record';

const components = [
	{
		name: '#record',
		component: () => import('&/Record/Record.vue'),
		componentProp: false,
		componentPropApi: false,
		modalProp: false,
		hookBeforeShow: hookBeforeShowRecord,
	},
	{
		name: '#review',
		component: () => import('&/ReviewCreate.vue'),
		componentProp: false,
		componentPropApi: 'review-create',
		modalProp: { size: 'md' },
		hookBeforeShow: false,
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

		/**
		 * В случае если заходим с бразуера localhost:3000#review
		 * 		то у from нет hash и соответсвенно переходим в next({ name: to.name });
		 * 		потомучто при next(false) ошибка рендеринга у клиента
		 * Если переходим со страницы на страницу то next(false)
		 */
		if (from.hash) {
			next(false);
		} else {
			next({ name: to.name });
		}

		await Vue.nextTick();

		// Проверка что открыта модалка
		const status = ctx.app.router.app.$modal.getStatus(component.name);
		if (status && status.open) {
			next(false);
			return;
		}

		// Если есть функция до открывания модалки
		if (component.hookBeforeShow && typeof component.hookBeforeShow === 'function')
			component.hookBeforeShow.call(ctx, to.query);

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
