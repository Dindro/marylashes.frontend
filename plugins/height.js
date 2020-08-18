/**
 * Баг связанный с height 100vh в мобилках
 */

const setVH = () => {
  const vh = (window.innerHeight * 0.01) - 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVH);
setVH();
