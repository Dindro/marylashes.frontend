<template>
	<div
		class="image-ratio"
		:class="[`image-ratio--${ratio}`]"
		:style="{ paddingTop: ratioStyle }"
	>
		<image-tag class="image-ratio__img" :image="image"></image-tag>
	</div>
</template>

<script>
import ImageTag from '+/ImageTag';

const DEFAULT_RATIO = '16x9';

const ratios = [
	'16x9',
	'4x2',
];

export default {
	components: {
		ImageTag,
	},
	props: {
		image: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		ratioStyle: null,
	}),
	computed: {
		ratio() {
			const { ratio } = this.image;
			const exist = ratios.indexOf(ratio) !== -1;
			if (exist) return ratio;
			if (!ratio) return DEFAULT_RATIO;

			// Пытаемся сами посчитать значение
			const values = ratio.split('x');
			if (values.length !== 2) return DEFAULT_RATIO;
			if (Number.isNaN(+values[0]) || Number.isNaN(+values[1])) return DEFAULT_RATIO;

			const width = +values[0];
			const heigth = +values[1];
			this.ratioStyle = `${100 / width / heigth}%`;
			return 'style';
		}
	}
}
</script>

<style lang="scss">

@function ratio($value) {
	@return #{100 / $value}#{'%'};
}

.image-ratio {
	position: relative;

	&__img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	&--16x9 {
		padding-top: ratio(16/9);
	}

	&--4x2 {
		padding-top: ratio(4/2);
	}
}
</style>
