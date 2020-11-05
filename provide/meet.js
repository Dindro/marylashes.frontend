const URL = '/api/v1/ajax/meet';
const URL_OPTION = `${URL}-option`;

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

		return $axios.post(URL, form);
	},

	/**
	 * Получить свободное
	 *
	 * @param {{ date: Number, duration: Number, type: String }} options
	 */
	getExist(options, optionsAxios) {
		return new Promise(resolve => {
			const resAxios = $axios.get(URL_OPTION, {
				params: options,
				...optionsAxios,
			});

			setTimeout(() => {
				resolve(resAxios);
			}, 1000);
		});

		return $axios.get(URL_OPTION, {
			params: options,
		});
	}
});
