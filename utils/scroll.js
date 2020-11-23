import { enablePageScroll, disablePageScroll, clearQueueScrollLocks, addFillGapSelector } from 'scroll-lock';

addFillGapSelector('[data-gap]');

const disableScroll = () => {
	disablePageScroll();
}

const enableScroll = () => {
	enablePageScroll();
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
