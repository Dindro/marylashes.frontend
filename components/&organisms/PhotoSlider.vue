<template>
	<div class="photo-slider">
		<div class="photo-slider__swiper" ref="swiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, index) of photo_slider.items" :key="index">
					<image-vue class="photo-slider__photo" :image="item"></image-vue>
				</div>
			</div>
			<nav-arrows :nav_arrows="{ color: 'dark' }" ref="nav_arrows"></nav-arrows>
		</div>

		<div class="photo-slider__info">
			<div class="photo-slider__count">
				<nav-count :nav_count="nav_count" ref="nav_count"></nav-count>
			</div>
			<div class="photo-slider__captions" ref="caption">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item, index) of photo_slider.items" :key="index">
						<p v-if="item.caption" class="photo-slider__caption text-default">{{ item.caption }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ImageVue from '+/Image';
import NavArrows from '+/NavArrows';
import NavCount from '+/NavCount';

import { convertToScalingPx } from '@/utils/convert';
import { devices } from '@/utils/breakpoints';

import { Swiper, Pagination, Navigation, Controller } from 'swiper';
Swiper.use([Pagination, Navigation, Controller]);

export default {
	components: {
		ImageVue,
		NavArrows,
		NavCount,
	},

	data: (ctx) => ({
		mainSlider: null,
		captionSlider: null,
		nav_count: {
			color: 'dark',
			current: 1,
			total: ctx.photo_slider.items.length,
		},
	}),

	props: {
		photo_slider: {
			type: Object,
			required: true,
		}
	},

	methods: {
		initSlider() {
			const { swiper, caption, nav_arrows, nav_count } = this.$refs;
			const { prev: prevEl, next: nextEl } = nav_arrows.getNavigation();

			this.captionSlider = new Swiper(caption, {
				slidesPerView: 1,
				autoHeight: true,
				allowTouchMove: false,
			});

			this.mainSlider = new Swiper(swiper, {
				speed: 700,
				slidesPerView: 1,
				spaceBetween: convertToScalingPx(8),
				breakpoints: {
					[devices.md]: {
						spaceBetween: convertToScalingPx(24),
					},
					[devices.lg]: {
						slideToClickedSlide: true,
						spaceBetween: convertToScalingPx(96),
					},
				},
				navigation: {
					prevEl,
					nextEl,
					disabledClass: 'disabled',
				},
				pagination: {
				el: nav_count.$el,
					type: 'custom',
					renderCustom: (swiper, current, total) => {
						this.nav_count.current = current;
						this.nav_count.total = total;
					},
				},
				controller: {
					control: this.captionSlider,
				}
			});



			this.$on('hook:beforeDestroy', () => {
				this.captionSlider.destroy();
				this.mainSlider.destroy();
			});
		}
	},

	mounted() {
		this.initSlider();
	}
}
</script>

<style lang="scss">
@import '~swiper/swiper.scss';

.photo-slider {
	&__swiper {
		position: relative;
	}

	&__info {
		display: flex;
		margin-top: rem(24);

		@include media-breakpoint-down(md) {
			margin-top: rem(40);
		}

		@include media-breakpoint-down(sm) {
			display: block;
			margin-top: rem(30);
		}
	}

	&__photo {
		width: 100%;
	}

	&__captions {
		flex: 1 0 auto;
		margin-left: rem(80);
		max-width: rem(730 - 80 - 40);

		@include media-breakpoint-down(md) {
			margin-left: rem(40);
			max-width: rem(424);
		}

		@include media-breakpoint-down(sm) {
			margin-left: 0;
			margin-top: rem(24);
			max-width: none;
		}

		&.swiper-container-initialized {
			.swiper-slide {
				@include defaultTransition(opacity);
				opacity: 0;
				pointer-events: none;

				&-active {
					opacity: 1;
					pointer-events: all;
				}
			}
		}
	}

	&__swiper {
		&.swiper-container-initialized {
			.swiper-slide {
				@include defaultTransition(opacity);
				opacity: 0.3;

				&-active {
					opacity: 1;
				}
			}
		}
	}

	.nav-arrows {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;

		@include media-breakpoint-down(md) {
			top: calc(100% + #{rem(8)});
			right: rem(-$indent-arrows-x);
			bottom: auto;
			left: auto;
			pointer-events: all;
		}

		@include media-breakpoint-down(sm) {
			right: rem(-$indent-arrows-x-sm);
		}

		&__button {
			@include media-breakpoint-up(lg) {
				pointer-events: all;
				position: absolute;
				top: 0;
				bottom: 0;
				margin-top: auto;
				margin-bottom: auto;

				&--prev {
					right: calc(100% + #{rem(8)});
				}

				&--next {
					left: calc(100% + #{rem(8)});
				}
			}
		}
	}
}
</style>
