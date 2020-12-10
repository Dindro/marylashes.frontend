import { enablePageScroll, disablePageScroll, clearQueueScrollLocks, addFillGapSelector } from 'scroll-lock';

addFillGapSelector('[data-gap]');

// scrollableElement - Элемент который будет прокручиваться, касается touch устроств или использовать data-scroll-lock-scrollable
const disableScroll = (scrollableElement) => {
	disablePageScroll(scrollableElement);
}

const enableScroll = (scrollableElement) => {
	enablePageScroll(scrollableElement);
}

/**
 * Включить скролл полноценно не смотря на scroll lock stack
 */
const enableScrollAll = () => {
	clearQueueScrollLocks();
}

export {
  enableScroll,
  disableScroll,
  enableScrollAll,
}
