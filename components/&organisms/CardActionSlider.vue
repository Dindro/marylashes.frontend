<template>
  <div class="card-action-slider">
    <div class="card-action-slider__marqu">
      <marqu :marqu="card_action_slider.marqu"></marqu>
      <marqu :marqu="Object.assign({}, card_action_slider.marqu, { direction: 'right', color: 'saphire' })"></marqu>
    </div>

    <!-- Title Slider -->
    <div class="card-action-slider__controls">
      <div ref="title" class="card-action-slider__titles">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) of card_action_slider.items" :key="index">
            <h3 class="card-action-slider__title">{{ item.title }}</h3>
          </div>
        </div>
      </div>
      <nav-arrows v-if="!isOnly" class="card-action-slider__arrows" ref="nav_arrows" :nav_count="nav_count"></nav-arrows>
    </div>

    <!-- Content Slider -->
    <div ref="content" class="card-action-slider__content">
      <div v-if="!isOnly" class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) of card_action_slider.items" :key="index">
          <card-action :card="item"></card-action>
        </div>
      </div>
      <card-action v-else :card="card_action_slider.items[0]"></card-action>
    </div>
  </div>
</template>

<script>
import CardAction from '^/CardAction';
import Marqu from '+/Marqu';

import { devices } from '@/utils/breakpoints';
import { convertToScalingPx } from '@/utils/convert';

import { Swiper, Thumbs, Controller, Parallax } from 'swiper';
Swiper.use([Thumbs, Controller, Parallax]);

export default {
	components: {
		CardAction,
		Marqu,
	},

	data: (context) => ({
		isOnly: context.card_action_slider.items.length <= 1,
		nav_count: {
			color: 'white',
			current: 1,
			total: context.card_action_slider.items.length,
		},
	}),

	props: {
		card_action_slider: {
			marqu: Object,
			items: Array,
		}
	},

	mounted() {
		if (this.isOnly) return;

		const titleSlider = new Swiper(this.$refs.title, {
			allowTouchMove: false,
			speed: 1000,
			spaceBetween: convertToScalingPx(40),
			slidesPerView: 1,
			breakpoints: {
				[devices.md]: {
					slidesPerView: 1,
				},
				[devices.lg]: {
					slidesPerView: 'auto',
				}
			},
		});

		const contentSlider = new Swiper(this.$refs.content, {
			speed: 1000,
			autoHeight: true,
			spaceBetween: convertToScalingPx(72),
			parallax: true,
			navigation: {
				prevEl: this.$refs.nav_arrows.getNavigation().prev,
				nextEl: this.$refs.nav_arrows.getNavigation().next,
				disabledClass: 'disabled',
			},
			thumbs: {
				swiper: titleSlider,
			},
			controller: {
				control: titleSlider,
			},
			breakpoints: {
				[devices.md]: {
					spaceBetween: convertToScalingPx(96),
				},
				[devices.lg]: {
					allowTouchMove: false,
				}
			}
		});

		this.$on('hook:beforeDestroy', () => {
			titleSlider.destroy();
			contentSlider.destroy();
		});
	},
}
</script>

<style lang="scss">
@import '~swiper/swiper.scss';

.card-action-slider {
	color: $color-white;

	&__title {
		user-select: none;
		@include h2;
	}

	&__controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: rem(40);

		@include media-breakpoint-down(sm) {
			margin-bottom: rem(16);
		}
	}

	&__titles {
		display: flex;
		width: rem(200);

		@include media-breakpoint-down(md) {
			width: rem(400);
		}

		@include media-breakpoint-down(sm) {
			width: calc(100% - #{rem(128)});
		}

		.swiper-slide {
			width: auto;
			opacity: 0.3;
			cursor: pointer;
			@include defaultTransition(opacity);

			@include media-breakpoint-down(md) {
				opacity: 0;
				pointer-events: none;
				transition-duration: 1s;
			}

			&-thumb-active {
				opacity: 1;
				pointer-events: all;
			}

			&:hover {
				opacity: 1;
			}
		}

		.swiper-wrapper {
			width: 100%;
			position: static;
			align-items: center;
		}
	}

  	&__arrows {
		flex-shrink: 0;
		margin-right: rem(-$indent-arrows);

		@include media-breakpoint-down(sm) {
			margin-right: rem(-$indent-arrows-sm);
		}
  	}

  	&__content {
    	&.swiper-container-initialized {
			.swiper-slide {
				@include defaultTransition(opacity);
				transition-duration: 1s;
				opacity: 0;

				&-active {
					opacity: 1;
				}
			}
    	}
  	}

	&__marqu {
		overflow: hidden;
		margin-left: rem(-$wrapper-gutter-lg-1);
		margin-right: rem(-$wrapper-gutter-lg-1);
		margin-bottom: rem(64);

		@include media-container-up {
			margin-left: $indent-container-up;
			margin-right: $indent-container-up;
		}

		@include media-breakpoint-down(md) {
			margin-bottom: rem(40);
		}
	}
}
</style>
