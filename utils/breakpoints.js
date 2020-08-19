const devices = {
	md: 640,
	lg: 990,
};

const isDesktop = () => window.matchMedia(`(min-width: ${devices.lg}px)`).matches;
const isMob = () => window.matchMedia(`(max-width: ${devices.md - 1}px)`).matches;
const isTablet = () => window.matchMedia(`(min-width: ${devices.md}px) and (max-width: ${devices.lg - 1}px)`).matches;
const isTouch = () => 'ontouchstart' in document.documentElement;

/**
 * Получить то если удовлетворяет разрешению
 */
const getForBreakpoints = (lg, md, sm) => {
	if (isDesktop()) return lg || md;
	else if (isTablet()) return md || lg;
	else return sm || md;
};

export {
	devices,
	isDesktop,
	isMob,
	isTablet,
	isTouch,
	getForBreakpoints,
}
