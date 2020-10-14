const KEY_NAME = 'SELECTED_SERVICES';

export default {
	add(service) {
		if (!service) return;

		const { view_id } = service;
		const values = this.loadStorage();
		values.push(view_id);
		this.saveStorage(values);
	},

	remove(services) {
		if (!services) return;
		if (!Array.isArray(services)) services = [services];

		const values = this.loadStorage();

		for (let i = 0; i < services.length; i++) {
			const { view_id } = services[i];
			const existId = values.indexOf(view_id);
			existId !== -1 && values.splice(existId, 1);
		}

		this.saveStorage(values);
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
