<template>
	<div class="nav-arrows">
		<btn class="nav-arrows__button nav-arrows__button--prev" :button="buttonPrev" @click.native="$emit('prev')" ref="prev"></btn>
		<btn class="nav-arrows__button nav-arrows__button--next" :button="buttonNext" @click.native="$emit('next')" ref="next"></btn>
		<slot name="after"></slot>
	</div>
</template>

<script>
import Btn from '+/Button';

const COLORS = {
	white: 'transparent',
	dark: 'transparent-dark',
};

export default {
	components: {
		Btn,
	},

	props: {
		nav_arrows: {
			type: Object,
			default: () => ({}),
		},
	},

	computed: {
		button() {
			return {
				color: COLORS[this.nav_arrows.color] || COLORS['white'],
				round: true,
				size: 'lg',
			};
		},

		buttonPrev() {
			const button = {
				icon: { name: '24/arrow-left' },
				title: 'Назад',
				disabled: this.nav_arrows.prevDisabled,
				loading: this.nav_arrows.prevLoading,
				hidden: this.nav_arrows.prevHidden,
			};

			return Object.assign({}, button, this.button);
		},

		buttonNext() {
			const button = {
				icon: { name: '24/arrow-right' },
				title: 'Вперед',
				disabled: this.nav_arrows.nextDisabled,
				loading: this.nav_arrows.nextLoading,
				hidden: this.nav_arrows.nextHidden,
			};

			return Object.assign({}, button, this.button);
		}
	},

	methods: {
		getNavigation() {
			return {
				prev: this.$refs.prev.$el,
				next: this.$refs.next.$el,
			}
		}
	},
};
</script>

<style lang="scss">
.nav-arrows {
	$b: #{&};
  	display: inline-flex;
}
</style>
