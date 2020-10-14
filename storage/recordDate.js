const KEY_NAME = 'RECORD_SELECTED_DATE';

export default {
	add(date) {
		if (!date) return;

		let value;
		if (date instanceof Date) value = date.getTime();
		else value = date;

		this.saveStorage(value);
	},

	get() {
		const value = this.loadStorage();
		if (!value) return;

		const date = new Date(parseInt(value));
		if (!isNaN(date.getTime())) return date;

		return value;
	},

	loadStorage() {
		return localStorage.getItem(KEY_NAME);
	},

	saveStorage(value) {
		localStorage.setItem(KEY_NAME, value);
	}
};
