import Vue from 'vue'

Vue.directive('cursor', {
	bind(el, binding, vnode) {
		const { $store } = vnode.context;
		const { arg, value } = binding;

		const cursor = {
			type: arg,
			...value,
		}

		el.addEventListener('mouseenter', el.cursor_enter = () => {
			$store.commit('SET_CURSOR', cursor);
		});

		el.addEventListener('mouseleave', el.cursor_leave = () => {
			$store.commit('SET_CURSOR', null);
		});
  	},

	unbind(el) {
		if (el.cursor_enter) {
			el.removeEventListener('mouseenter', el.cursor_enter);
		}

		if (el.cursor_leave) {
			el.removeEventListener('mouseleave', el.cursor_leave);
		}
	}
});
