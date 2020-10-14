<template>
	<div
		class="card-review-slider"
		:class="[`card-review-slider--${card_review_slider.type || 'default'}`]"
		ref="slider"
	>
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item, index) in card_review_slider.items" :key="index">
				<card-review :card="Object.assign({}, item, { type: card_review_slider.type })"></card-review>
			</div>
		</div>
		<nav-arrows class="card-review-slider__arrows" :nav_arrows="{ color: 'dark' }" ref="nav_arrows"></nav-arrows>
	</div>
</template>

<script>
import NavArrows from '+/NavArrows';
import CardReview from '^/CardReview';

import { convertToScalingPx } from '@/utils/convert';
import { devices } from '@/utils/breakpoints';

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
				spaceBetween: convertToScalingPx(8),
				parallax: true,
				initialSlide: this.card_review_slider.type === 'reverse' ? this.card_review_slider.items.length - 1 : 0,
				navigation: {
					prevEl: this.$refs.nav_arrows.getNavigation().prev,
					nextEl: this.$refs.nav_arrows.getNavigation().next,
					disabledClass: 'disabled',
				},
				breakpoints: {
					[devices.md]: {
						spaceBetween: convertToScalingPx(24),
					},
					[devices.lg]: {
						allowTouchMove: false,
						spaceBetween: convertToScalingPx(112),
					}
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
	$b: #{&};

	position: relative;

	@include media-breakpoint-down(md) {
		padding-right: rem(64);
	}

	@include media-breakpoint-down(sm) {
		padding-right: 0;
	}

	&__arrows {
		position: absolute;
		bottom: calc(100% + #{rem(8)});
		right: rem(-$indent-arrows);

		@include media-breakpoint-down(md) {
			display: none;
		}
	}

	&.swiper-container-initialized {
		.swiper-slide {
			@include defaultTransition(opacity);
			transition-duration: 1s;

			@include media-breakpoint-up(lg) {
				pointer-events: none;
				opacity: 0;
			}

			@include media-breakpoint-down(md) {
				opacity: 0.3;
			}

			&-active {
				opacity: 1;


				@include media-breakpoint-up(lg) {
					pointer-events: initial;
				}
			}
		}
	}

	&--reverse {
		#{$b}__arrows {
			left: rem(-$indent-arrows);
			right: auto;
		}

		@include media-breakpoint-down(md) {
			padding-right: 0;
			padding-left: rem(64);
		}

		@include media-breakpoint-down(sm) {
			padding-left: 0;
		}
	}
}
</style>
