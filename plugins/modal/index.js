/**
 * Вставляется в документ modal-stack
 * Если вызывается show и передается компонент, то показывается это все в modal-stack
 * 	Иначе ищем модалку по названию и показываем
 */

import { createDivInBody } from './utils';
import Vue from 'vue';
import ModalStack from '&/ModalStack';

export default (ctx, inject) => {
	if (Vue.prototype.$modal) {
		process.env.NODE_ENV === 'production' && console.warn('$modal has exist. $modal not install');
		return;
	}

	// Переходник событие
	const subscription = new Vue();

	Object.defineProperty(Vue.prototype, '$modal', {
		get: function() {
			// Контекст откуда вызывается this.$modal
			const caller = this;

			// Если контектс не Vue
			if (!(caller instanceof Vue)) {
				process.env.NODE_ENV === 'production' && console.warn('$modal inject error: caller not Vue');
			}

			const root = caller.$root;

			// Вставляем modal-stack в страницу
			if (!root.modalStack) {
				const element = createDivInBody();
				new Vue({
					parent: root,
					render: h => h(ModalStack),
				}).$mount(element);
			}

			return {
				subscription,

				async show(...args) {
					const [component] = args;
					switch (typeof component) {
						case 'string':
							// Static
							// Open
							this.showStatic(...args);
							break;

						case 'object':
						case 'function':
							// Dynamic component
							return await this.showComponent(...args);
							break;
					}

				},

				showStatic(name, params) {
					subscription.$emit('toggle', name, true, params)
				},

				async showComponent(component, componentProps, modalProps, modalListeners) {
					return await root?.modalStack.add(component, componentProps, modalProps, modalListeners);
				},

				hide(name, params) {
					subscription.$emit('toggle', name, false, params);
				},

				toggle(name, params) {
					subscription.$emit('toggle', name, undefined, params);
				},

				getStatus(name) {
					subscription.$emit('status', name);
					const status = Object.assign({}, subscription.status);
					subscription.status = null;
					return status;
				}
			}
		}
	});
};
