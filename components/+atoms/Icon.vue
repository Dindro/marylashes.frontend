<template>
  <i class="icon" :class="[`icon--${size}`, `icon--${name}`]" v-html="src"></i>
</template>

<script>
export default {
	props: {
		icon: {
			type: Object,
			required: true,
			default: () => ({}),
		},
	},

	data: (ctx) => ({
		src: ctx.getIcon(ctx.icon.name),
		size: ctx.icon.size || ctx.getSize(ctx.icon.name) || 'default',
		name: ctx.getName(ctx.icon.name),
	}),

	methods: {
		getSize(name) {
			if (!name) return 'error-icon';

			const words = name.split('/');
			if (words.length <= 1) return undefined;

			const size = parseInt(words[0]);
			if (!size || isNaN(size)) return undefined;

			return size;
		},

		getName(name) {
			if (!name) return 'error-icon';

			const words = name.split('/');
			if (words.length <= 1) return name;

			return words[1];
		},

		getIcon(name) {
			try {
				return require(`assets/icons/${name}.svg?raw`);
			} catch (err) {
				process.env.NODE_ENV === 'development' && console.warn(`icon "${name}" not found!`);
				return '';
			}
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

	&--32 {
		width: rem(32);
		height: rem(32);
	}

	svg {
		vertical-align: initial;
		width: 100%;
		height: 100%;
	}
}
</style>
