const URL = '/api/v1/ajax/photo'

export default $axios => ({
	get() {
		return $axios.get(URL);
	},
});
