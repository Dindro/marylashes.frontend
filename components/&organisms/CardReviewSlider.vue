<template>
	<div class="card-review-slider" ref="slider">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item, index) in card_review_slider.items" :key="index">
				<card-review :card="item"></card-review>
			</div>
		</div>
		<nav-arrows :nav_arrows="{ color: 'dark' }" ref="nav_arrows"></nav-arrows>
	</div>
</template>

<script>
import NavArrows from '+/NavArrows';
import CardReview from '^/CardReview';

import { Swiper, Navigation, Parallax } from 'swiper';
Swiper.use([Navigation, Parallax]);

export default {
	components: {
		NavArrows,
		CardReview,
	},

	props: {
		card_review_slider: {
			type: Object,
			required: true,
		}
	},

	methods: {
		initSlider() {
			const slider = new Swiper(this.$refs.slider, {
				speed: 1000,
				autoHeight: true,
				spaceBetween: 3,
				parallax: true,
				navigation: {
					prevEl: this.$refs.nav_arrows.getNavigation().prev,
					nextEl: this.$refs.nav_arrows.getNavigation().next,
					disabledClass: 'disabled',
				},
				breakpoints: {
					// [devices.md]: {
					// 	spaceBetween: 3,
					// },
					// [devices.lg]: {
					// 	allowTouchMove: false,
					// }
				}
			});

			this.$on('hook:beforeDestroy', () => {
				slider.destroy();
			}, { once: true });
		}
	},

	mounted() {
		this.initSlider();
	}
}
</script>

<style lang="scss">
@import '~swiper/swiper.scss';

.card-review-slider {
	position: relative;

	.nav-arrows {
		position: absolute;
		bottom: calc(100% + #{rem(8)});
		right: rem(-$indent-arrows-x);
	}
}
</style>
