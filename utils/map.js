const getSettings = () => {
	return {
		apiKey: process.env.MAP_API_KEY,
		lang: 'ru_RU',
		coordorder: 'latlong',
		version: '2.1'
	}
};

export {
	getSettings,
};

