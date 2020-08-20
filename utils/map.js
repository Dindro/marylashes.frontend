const getSettings = () => {
	return {
		apiKey: process.env.MAP_API || 'f0a4901c-c5e5-48ea-bba6-ef27b13e3460',
		lang: 'ru_RU',
		coordorder: 'latlong',
		version: '2.1'
	}
};

export {
	getSettings,
};

