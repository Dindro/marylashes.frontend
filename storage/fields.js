const KEY_NAME = 'FIELD';

export default {
	// Добавить
	add(value, ...names) {
		if (!names.length) {
			process.env.NODE_ENV === 'development' && console.info('FIELD Storage: names not found');
			return;
		}

		const keyName = this.getKeyName(names);
		this.saveStorage(keyName, value);
	},

	// Получить
	get(...names) {
		const keyName = this.getKeyName(names);
		return this.loadStorage(keyName);
	},

	// Удалить
	remove(...names) {
		const keyName = this.getKeyName(names);
		this.removeStorage(keyName);
	},

	// Удалить группой
	removeGroup(...names) {
		const keyName = this.getKeyName(names);
		const keyNamesStart = Object.keys(localStorage).filter(key => key.startsWith(keyName));

		for (const key of keyNamesStart) {
			this.removeStorage(key);
		}
	},

	saveStorage(keyName, value) {
		localStorage.setItem(keyName, value);
	},

	loadStorage(keyName) {
		return localStorage.getItem(keyName);
	},

	removeStorage(keyName) {
		localStorage.removeItem(keyName);
	},

	getKeyName(names) {
		return [KEY_NAME, ...names].join('_');
	}
};

