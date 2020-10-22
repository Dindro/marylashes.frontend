const KEY_NAME = 'FIELD';

export default {
	add(value, ...names) {
		if (!names.length) {
			process.env.NODE_ENV === 'development' && console.info('FIELD Storage: names not found');
			return;
		}

		const keyName = this.getKeyName(names);
		this.saveStorage(keyName, value);
	},

	saveStorage(keyName, value) {
		localStorage.setItem(keyName, value);
	},

	get(...names) {
		const keyName = this.getKeyName(names);
		return this.loadStorage(keyName);
	},

	loadStorage(keyName) {
		return localStorage.getItem(keyName);
	},

	getKeyName(names) {
		return [KEY_NAME, ...names].join('_');
	}
};

