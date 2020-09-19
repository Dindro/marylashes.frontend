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
	async nuxtServerInit(store, ctx) {
		const headerRequest = ctx.$axios.$get('/api/v1/components/header');
		const footerRequest = ctx.$axios.$get('/api/v1/components/footer');
		const { header } = await headerRequest;
		const { footer } = await footerRequest;
		store.commit('SET_HEADER', header);
		store.commit('SET_FOOTER', footer);
	}
};
