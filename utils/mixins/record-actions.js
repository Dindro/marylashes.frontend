export default {
	computed: {
		dropdownItems() {
			return this.getDropdownItems();
		},
	},

	methods: {
		getDropdownItems() {
			const items = [
				{
					text: 'Редактировать',
					handler: this.edit,
					sort: 1
				},
				{
					text: 'Удалить',
					handler: this.delete,
					sort: 100,
				}
			];

			if (!this.card.clientId) {
				items.push({
					text: 'Привязать',
					handler: this.bind,
					sort: 10,
				});
			} else {
				items.push({
					text: 'Отвязать',
					handler: this.unbind,
					sort: 10,
				});
			}

			if (['create', 'correct', 'report'].indexOf(this.card.statusId) !== -1) {
				items.push({
					text: 'Отменить',
					handler: this.cancel,
					sort: 20,
				});
			}

			if (this.card.statusId === 'report') {
				items.push({
					text: 'Создать отчет',
					handler: this.createReport,
					sort: 5,
				});
			}

			return items.sort((a, b) => a.sort - b.sort);
		},

		edit() {

		},

		delete() {

		},

		cancel() {

		},

		createReport() {

		},

		bind() {

		},

		unbind() {

		},
	},
}
