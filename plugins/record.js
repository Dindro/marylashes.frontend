import Record from '&/Record/Record';
import Vue from 'vue';

export default (ctx, inject) => {
	const RECORD_HASH = '#record';
	let modalName;

	ctx.app.router.beforeEach(async (to, from, next) => {

		// Если не модалка
		if (to.hash !== RECORD_HASH) {
			next();
			return;
		}

		next({ name: to.name });

		// Проверка что открыта модалка Record
		if (modalName) {
			const status = ctx.app.router.app.$modal.getStatus(modalName);

			if (status && status.open) {
				next(false);
				return;
			}
		}

		await Vue.nextTick();

		// Установка записей
		const { view_id } = to.query;
		if (view_id) {
			// Удаляем все выбранные
			ctx.store.commit('record/DISELECT_SERVICES', ctx.store.state.record.services);
			// Выбираем один
			ctx.store.dispatch('record/selectService', view_id);
		}

		// Отображение модалки
		modalName = await ctx.app.router.app.$modal.show(Record);
	});
};
