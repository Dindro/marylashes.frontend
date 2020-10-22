export const state = () => ({
	header: {},
	footer: {},
	cursor: null,
});

export const mutations = {
	SET_HEADER: (state, header) => state.header = header,
	SET_FOOTER: (state, footer) => state.footer = footer,
	SET_CURSOR: (state, cursor) => state.cursor = cursor,
};

export const actions = {
	async nuxtServerInit({ dispatch, commit }, ctx) {
		const headerRequest = ctx.$axios.$get('/api/v1/components/header');
		const footerRequest = ctx.$axios.$get('/api/v1/components/footer');
		const recordRequest = ctx.$axios.$get('/api/v1/components/record');

		const { header } = await headerRequest;
		const { footer } = await footerRequest;
		const record = await recordRequest;
		commit('SET_FOOTER', footer);
		commit('SET_HEADER', header);
		dispatch('record/init', record);
	},

	async nuxtClientInit({ dispatch }, ctx) {
		dispatch('record/load');
	}
};
