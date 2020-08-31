<template>
	<div class="card-article-slider">
		<h2 class="card-article-slider__title">
			{{ card_article_slider.title }}
			<sup class="card-article-slider__count" v-if="card_article_slider.count && card_article_slider.count_label">
				<span>{{ card_article_slider.count }}</span>
				<span>{{ card_article_slider.count_label }}</span>
			</sup>
		</h2>
		<hr class="card-article-slider__hr">
		<div v-if="card_article_slider.action" class="card-article-slider__action">
			<action :action="card_article_slider.action"></action>
		</div>
		<div class="card-article-slider__slider" ref="swiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, index) in card_article_slider.items" :key="index">
					<card-article :card="item"></card-article>
				</div>
			</div>

			<nav-arrows :nav_arrows="{ color: 'dark' }" class="card-article-slider__arrows" ref="nav_arrows">
				<template v-slot:after>
					<div class="overlay-panel overlay-panel--left"></div>
					<div class="overlay-panel overlay-panel--right"></div>
				</template>
			</nav-arrows>
		</div>
	</div>
</template>

<script>
import { devices } from '@/utils/breakpoints';
import { convertToScalingPx } from '@/utils/convert';

import { Swiper, Navigation } from 'swiper';
Swiper.use([Navigation]);

export default {
	props: {
		card_article_slider: {
			type: Object,
			required: true,
		},
	},

	data: () => ({
		slider: null,
	}),

	methods: {
		initSlider() {
			const { prev: prevEl, next: nextEl } = this.$refs.nav_arrows.getNavigation();

			this.slider = new Swiper(this.$refs.swiper, {
				slidesPerView: 1,
				breakpoints: {
					[devices.md]: {
						slidesPerView: 2,
					},
					[devices.lg]: {
						slidesPerView: 3,
						spaceBetween: convertToScalingPx(40),
					},
				},
				navigation: {
					prevEl,
					nextEl,
					disabledClass: 'disabled',
				}
			});

			this.$once('hook:beforeDestroy', () => {
				this.slider.destroy();
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

.card-article-slider {
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-rows: auto auto auto;
	grid-template-areas:
		"title action"
		"hr hr"
		"slider slider";

	&__title {
		display: flex;
		align-items: center;
		grid-area: title;
		@include h2;
		font-weight: 700;
	}

	&__hr {
		grid-area: hr;
		margin: rem(24) 0 rem(40);
	}

	&__action {
		grid-area: action;
		display: flex;
		align-items: center;
	}

	&__count {
		@include text-small;
	}

	&__slider {
		position: relative;
		grid-area: slider;
		margin-left: rem(-112);
		margin-right: rem(-112);
		padding: 0 rem(112);
		overflow: hidden;

		.swiper-wrapper {
			z-index: auto;
		}

		.swiper-slide {
			height: auto;
		}
	}

	.nav-arrows {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		pointer-events: none;

		* {
			pointer-events: all;
		}

		&__button {
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;
			z-index: 1;

			&--prev {
				left: rem(8);
			}

			&--next {
				right: rem(8);
			}
		}
	}
}

.overlay-panel {
	position: absolute;
	top: rem(-48);
	bottom: rem(-48);
	right: 0;
	width: rem(96);

	// Тень
	&::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		left: 0;
		height: 96%;
		padding-left: 100%;
		border-radius: 50%;
		@include defaultTransition(opacity);
	}

	// Белая плашка
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: $color-white;
	}

	&--left {
		left: 0;

		&::before {
			box-shadow: rem(10) 0px rem(14) 0px rgba($color-dark, 0.1);

			// Не активное состояние
			@at-root .nav-arrows__button--prev.disabled ~ & {
				opacity: 0;
			}
		}
	}

	&--right {
		right: 0;

		&::before {
			box-shadow: rem(-10) 0px rem(14) 0px rgba($color-dark, 0.1);

			// Не активное состояние
			@at-root .nav-arrows__button--next.disabled ~ & {
				opacity: 0;
			}
		}
	}
}
</style>
