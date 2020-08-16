import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

let scrollStack = 0;

const disableScroll = () => {
  disableBodyScroll(document.body);
  scrollStack++;
}

const enableScroll = () => {
  scrollStack --;

  if (scrollStack <= 0) {
    enableBodyScroll(document.body);
    scrollStack = 0;
  }
}

/**
 * Включить скролл полноценно не смотря на scrollstack
 */
const enableScrollAll = () => {
  scrollStack = 0;
  enableScroll();
}

export {
  enableScroll,
  disableScroll,
  enableScrollAll,
}
