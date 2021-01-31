<template>
	<div
		class="box"
		:class="[`box--${ratioNormalize}`]"
		:style="{ paddingTop: ratioStyle }">
		<slot></slot>
	</div>
</template>

<script>
const DEFAULT_RATIO = '16x9';
const RATIOS = [
	'1x1',
	'16x9',
	'4x2',
];

export default {
	props: {
		ratio: {
			type: String,
			required: true,
			default: DEFAULT_RATIO,
		},
	},

	data: () => ({
		ratioStyle: null,
	}),

	computed: {
		ratioNormalize() {
			const ratio = this.ratio;
			const exist = RATIOS.indexOf(ratio) !== -1;
			if (exist) {
				this.ratioStyle = null;
				return ratio;
			};

			// Пытаемся сами посчитать значение
			const values = ratio.split('x');
			if (values.length !== 2) return DEFAULT_RATIO;
			if (Number.isNaN(+values[0]) || Number.isNaN(+values[1])) return DEFAULT_RATIO;

			const width = +values[0];
			const heigth = +values[1];
			this.ratioStyle = `${100 / (width / heigth)}%`;
			return 'style';
		},
	},
}
</script>

<style lang="scss">
@function ratio($value) {
	@return #{100 / $value}#{'%'};
}

.box {
	position: relative;

	& > * {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	&--1x1 {
		padding-top: 100%;
	}

	&--16x9 {
		padding-top: ratio(16/9);
	}

	&--4x2 {
		padding-top: ratio(4/2);
	}
}
</style>
