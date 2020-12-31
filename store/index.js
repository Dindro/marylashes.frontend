export const state = () => ({
	header: {},
	footer: {},
	navbar: {},
	cursor: null,
});

export const mutations = {
	SET_HEADER: (state, header) => state.header = header,
	SET_FOOTER: (state, footer) => state.footer = footer,
	SET_NAVBAR: (state, navbar) => state.navbar = navbar,
	SET_CURSOR: (state, cursor) => state.cursor = cursor,
};

export const actions = {
	async nuxtServerInit({ dispatch, commit }, ctx) {
		const headerRequest = ctx.$axios.$get('/api/v1/components/header');
		const footerRequest = ctx.$axios.$get('/api/v1/components/footer');
		const navbarRequest = ctx.$axios.$get('/api/v1/components/navbar');
		const recordRequest = ctx.$axios.$get('/api/v1/components/record');

		const { header } = await headerRequest;
		const { footer } = await footerRequest;
		const { navbar } = await navbarRequest;
 		const record = await recordRequest;
		commit('SET_FOOTER', footer);
		commit('SET_HEADER', header);
		commit('SET_NAVBAR', navbar);
		dispatch('record/init', record);
	},

	async nuxtClientInit({ dispatch }, ctx) {
		dispatch('record/load');
	}
};
