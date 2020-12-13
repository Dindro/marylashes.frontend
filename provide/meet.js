const URL = '/meet';
const URL_OPTION = `${URL}-option`;

export default $api => ({
	/**
	 * Получить мит
	 * @param {{ date: Number, duration: Number, type: [Boolean, String] }} options
	 */
	get(options) {
		return $api.get('/meet', {
			params: options,
		});
	},

	add(form) {
		return new Promise(resolve => {
			const f = $api.post(URL, form);

			setTimeout(() => {
				const res = {
					data: {
						id: 'id' + Date.now(),
						title: "Запись добавлена",
						text: "За день до посещения с вами свяжемся для подтверждения записи.<br>Вы также можете <b>отменить</b> запись в разделе «Выберите услугу»",
						action: {
							text: "Закрыть",
							type: "button",
							color: "outline-dark",
						}
					}
				};
				resolve(res);
			}, 1500);
		});

		return $api.post(URL, form);
	},

	/**
	 * Получить свободное
	 *
	 * @param {{ date: Number, duration: Number, type: String }} options
	 */
	getExist(options, optionsAxios) {
		return new Promise(resolve => {
			const resAxios = $api.get(URL_OPTION, {
				params: options,
				...optionsAxios,
			});

			setTimeout(() => {
				resolve(resAxios);
			}, 1000);
		});

		return $api.get(URL_OPTION, {
			params: options,
		});
	}
});
