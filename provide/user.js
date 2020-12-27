export default $api => ({
	signin(userData) {
		return $api.post('/signin', userData);
	},

	logout() {
		return $api.post('/logout');
	}
});
