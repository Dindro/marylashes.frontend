const KEY_NAME = 'MEETS';

export default {
	add(meet) {
		if (!meet) return;

		const values = this.loadStorage();
		values.push(meet);
		this.saveStorage(values);
	},

	remove(id) {
		if (!id) return;

		const values = this.loadStorage();
		const meet = values.find(value => value.id === id);
		if (meet) {
			const index = values.indexOf(value => value === meet);
			values.splice(index, 1);
			this.saveStorage(values);
		}
	},

	update(meets) {
		if (!Array.isArray(meets)) {
			meets = [ meets ];
		}

		const meetsStorage = this.loadStorage();
		meets.forEach(meet => {
			let meetFinded = meetsStorage.find(m => m.id === meet.id);
			if (!meetFinded) return;

			meetFinded = meet;
		});

		this.saveStorage(meetsStorage);
	},

	get() {
		return this.loadStorage();
	},

	loadStorage() {
		const text = localStorage.getItem(KEY_NAME);
		if (!text) return [];

		try {
			return JSON.parse(text);
		} catch (err) {
			return [];
		}
	},

	saveStorage(values) {
		if (!Array.isArray(values)) return;

		const text = JSON.stringify(values);
		localStorage.setItem(KEY_NAME, text);
	}
};
