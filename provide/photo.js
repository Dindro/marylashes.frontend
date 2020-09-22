const URL = '/api/v1/ajax/photo';

export default $axios => ({
	/**
	 * Получить фото
	 * @param {Array} ids
	 * @param {Number} count
	 */
	get(ids, count) {
		return new Promise(resolve => {
			const f = $axios.get(URL, {
				params: {
					ids,
					count,
				}
			});

			setTimeout(() => {
				resolve(f);
			}, 5000);
		});

		return $axios.get(URL, {
			params: {
				ids,
				count,
			}
		});
	},
});
