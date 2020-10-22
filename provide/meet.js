const URL = '/api/v1/ajax/meet';

export default $axios => ({
	/**
	 * Получить мит
	 * @param {{ date: Number, duration: Number, type: [Boolean, String] }} options
	 */
	get(options) {
		return new Promise(resolve => {
			const f = $axios.get(URL, {
				params: options,
			});

			setTimeout(() => {
				resolve(f);
			}, 1500);
		});

		return $axios.get(URL, {
			params: options,
		});
	},

	add(form) {
		return new Promise(resolve => {
			const f = $axios.post(URL, form);

			setTimeout(() => {
				resolve(f);
			}, 1500);
		});

		return $axios.post(URL, form);
	}
});
