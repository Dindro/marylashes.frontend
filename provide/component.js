const URL = '/api/v1/components/';

export default $axios => ({
	/**
	 * Получить данные компонента
	 * @param {String} name
	 */
	get(name) {
		return $axios.get(`${URL}${name}`);
	},
});
