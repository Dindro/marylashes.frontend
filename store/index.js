export const state = () => ({
  header: {}
});

export const mutations = {
  SET_HEADER: (state, header) => state.header = header,
};

export const actions = {
  async nuxtServerInit(store, context) {

    const { header } = await context.$axios.$get('/api/v1/components/header');
    store.commit('SET_HEADER', header);
  }
};
