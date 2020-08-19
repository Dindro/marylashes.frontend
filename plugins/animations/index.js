import Vue from 'vue'
import { getOptions  } from './helper';
import list from './list';

Vue.directive('animate', {
  bind(el, binding) {

    // Валидация если строка, если ничего нет, если объект
    const option = getOptions(binding.value);

    // Вызываем анимацию по его названию
    const animateFunction = list[option.name];
    if (typeof animateFunction === 'function') {
      el.animate = animateFunction({ el, binding }, option);
    }
  },

  unbind(el) {
    // Отвязваемся от анимации, очищаем память
    if (el.animate) {
      if (el.animate.kill) {
        el.animate.kill();
        el.animate = null;
      }
    }
  }
});
