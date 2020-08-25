const DEFAULT_FONT_SIZE = 16;

const getCurrentFontSize = () => +getComputedStyle(document.documentElement).fontSize.replace(/px/, '') || DEFAULT_FONT_SIZE;

/**
 * Перевод px в px при текущем font-size
 * @param {Number} value Значение в px
 */
const convertToScalingPx = (value) => {
	const fontSize = getCurrentFontSize();
    if (fontSize === DEFAULT_FONT_SIZE) return value;

    const ratio = value / DEFAULT_FONT_SIZE;
    return ratio * fontSize;
};

export {
	convertToScalingPx,
};

