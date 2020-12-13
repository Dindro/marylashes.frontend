export default $api => ({
	/**
	 * Получить данные компонента
	 * @param {String} name
	 */
	async get(name) {
		return {};
		return await $api.$get(`/components/${name}`);
	},
});
