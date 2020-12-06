export function modalBeforeShow(props) {
	const { view_id } = props;
	if (view_id) {
		// Удаляем все выбранные
		this.store.commit('record/DISELECT_SERVICES', this.store.state.record.services);
		// Выбираем один
		this.store.dispatch('record/selectService', view_id);
	}
}
