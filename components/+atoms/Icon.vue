<template>
  <i class="icon" :class="[`icon--${size}`, `icon--${name}`]" v-html="src"></i>
</template>

<script>
export default {
	props: {
		icon: {
		type: Object,
		required: true,
		}
	},

	data: (context) => ({
		src: require(`assets/icons/${context.icon.name}.svg?raw`),
		size: context.icon.size || context.getSize(context.icon.name) || 'default',
		name: context.getName(context.icon.name),
	}),

	methods: {
		getSize(name) {
			const words = name.split('/');
			if (words.length <= 1) return undefined;

			const size = words[0];
			return size;
		},

		getName(name) {
			const words = name.split('/');
			if (words.length <= 1) return name;

			return words[1];
		}
	},
}
</script>

<style lang="scss">
.icon {
	display: inline-block;

	&,
	&--default,
	&--24 {
		width: rem(24);
		height: rem(24);

		@include media-breakpoint-down(sm) {
		width: rem(20);
		height: rem(20);
		}
	}

	&--16 {
		width: rem(16);
		height: rem(16);
	}

	svg {
		width: 100%;
		height: 100%;
	}
}
</style>
