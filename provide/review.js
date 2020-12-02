const URL = '/api/v1/ajax/review';

export default $axios => ({
	add(review) {
		return new Promise(resolve => {
			const reviewCreate = $axios.post(URL, review, {
				headers:{ 'Content-Type': 'multipart/form-data' },
			});

			setTimeout(() => {
				const res = {
					data: {
						title: 'Спасибо',
						text: `<b>${review.NAME}</b>, спасибо вам за оставленный отзыв :)`,
						action: {
							type: 'button',
							color: 'outline-dark',
							text: 'Закрыть',
						},
						factoid: {
							text: 5,
							after: '%',
							label: 'Скидка на cледующее наращивание',
						}
					},
				};
				resolve(res);
			}, 1500);
		});

		return $axios.post(URL, review, {
			headers:{ 'Content-Type': 'multipart/form-data' },
		});
	},
});
