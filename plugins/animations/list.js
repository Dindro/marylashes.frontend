import Vue from 'vue';
import { getForBreakpoints } from '~/utils/breakpoints';

export default {
	/**
	 * Анимация border - ширина border меняется
	 * @param {Object} binding 	- объект получаемые при binding
	 * @param {Object} option 	- объект переданный В binding
	 */
	border({ el }, option) {
		const gsap = require('gsap').default;
		const { ScrollTrigger } = require('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		// Создаем вспомогательный элемент и стилизуем
		el.style.position = 'relative';
		const insertAnimateBlock = document.createElement('div');
		insertAnimateBlock.style.position = 'absolute';
		insertAnimateBlock.style.pointerEvents = 'none';
		insertAnimateBlock.style.top
			= insertAnimateBlock.style.bottom
			= insertAnimateBlock.style.right
			= insertAnimateBlock.style.left = '0';

		// Вычесляем бордер при разных разрешениях
		const border = getForBreakpoints(...option.border || ['5rem', '1.5rem', '0.9rem']);
		insertAnimateBlock.style.border = `${border} solid ${option.color}`;

		// Вставим вспомогательный элемент
		el.appendChild(insertAnimateBlock);

		// Создаем анимацию
		const animation = gsap.to(insertAnimateBlock, {
			scrollTrigger: {
				trigger: el,
				start: option.start || "top center",
				end: option.end || "bottom center",
				scrub: 0.6,
			},
			borderWidth: 0,
		});

		// HACK: корректно работает при переходах по страницам
		Vue.nextTick().then(() => {
			ScrollTrigger.refresh();
		});

		return animation;
	}
};
