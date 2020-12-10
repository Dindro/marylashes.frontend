<template>
	<div class="blueimp-gallery blueimp-gallery-controls" :id="id" aria-label="image gallery" aria-modal="true" role="dialog">
		<div class="slides" aria-live="polite"></div>
		<nav-arrows ref="nav_arrows" :nav_arrows="nav_arrows" @prev="prev" @next="next"></nav-arrows>


		<!-- Рендер на клиенте так как проблемы при использовании переменных -->
		<client-only>
			<btn class="blueimp-gallery__close" @click.native="$emit('close')" :button="{ icon: { name: '24/cross' }, round: true, color: 'transparent', size: 'lg' }"></btn>

			<div class="blueimp-gallery-text" v-if="slide">
				<div class="blueimp-gallery-text__content">
					<h4 class="blueimp-gallery-text__view">{{ slide.view }}</h4>
					<p class="blueimp-gallery-text__effect">{{ slide.effect }} {{ effect_text }}</p>
				</div>
				<btn class="blueimp-gallery-text__button" :button="Object.assign({}, button, { round: true, color: 'white' })"></btn>
			</div>
		</client-only>

	</div>
</template>

<script>
import 'blueimp-gallery/css/blueimp-gallery.min.css';

import Vue from 'vue';
import NavArrows from '+/NavArrows';
import Btn from '+/Button';

import { isMob } from '@/utils/breakpoints';
import { disableScroll, enableScroll } from '~/utils/scroll';

export default {
	components: {
		NavArrows,
		Btn,
	},
    props: {
		images: {
			type: Array,
			default() {
				return [];
			},
		},
		options: {
			type: Object,
			default() {
				return {};
			},
		},
		index: {
			type: Number,
		},
		id: {
			type: String,
			default: 'blueimp-gallery',
		},
		button_text: {
			type: String,
			default: 'Записаться на',
		},
		button_text_mob: {
			type: String,
			default: 'Записаться',
		},
		effect_text: {
			type: String,
			default: 'эффект'
		},
    },

    data: () => ({
		blueimp: null,
		instance: null,
		slide: null,
		nav_arrows: {
			prevDisabled: false,
			nextDisabled: false,
			nextLoading: false,
		}
	}),

	computed: {
		button() {
			return {
				text: isMob() ? this.button_text_mob : `${this.button_text} ${this.slide.view.toLowerCase()}`,
				href: {
					hash: 'record',
					query: {
						view_id: this.slide.view.toUpperCase(),
					},
				},
			};
		}
	},

    watch: {
		index(value) {
			if (value !== null) {
				this.open(value);

			} else {
				if (this.instance) {
					this.instance.close();
				}

				this.$emit('close');
			}
		},
    },

    mounted() {
		this.blueimp = require('blueimp-gallery');
    },

    destroy() {
		if (this.instance !== null) {
			this.instance.destroyEventListeners();
			this.instance.close();
			this.instance = null;
		}
    },

    methods: {
		open(index = 0) {
			const options = {
				container: this.$el,
				continuous: false,
				index,
				transitionDuration: 600,
				hidePageScrollbars: false,
				onopen: this.onOpen,
				onclose: this.onClose,
				onslide: (...args) => {
					this.changeDescription(...args);
					this.checkEdge(...args);
				}
			};

			this.instance = this.blueimp(this.images, options);
		},

		onClose() {
			this.$emit('close');
			enableScroll();
		},

		onOpen() {
			disableScroll();
		},

		next() {
			if (this.instance) {
				this.instance.next();
			}
		},

		prev() {
			if (this.instance) {
				this.instance.prev();
			}
		},

		changeDescription(index, slide) {
			this.slide = this.images[index];
		},

		checkEdge(index) {
			// Начало
			if (index === 0) {
				this.nav_arrows.prevDisabled = true;
				this.$emit('start');

			// Конец
			} else if (index === this.images.length - 1) {
				this.nav_arrows.nextDisabled = true;
				this.$emit('end');
			} else {
				this.nav_arrows.prevDisabled = false;
				this.nav_arrows.nextDisabled = false;
			}
		},

		async add() {
			await this.$nextTick();
			const index = this.instance.getIndex();
			const images = this.images.slice(index, this.images.length);
			this.instance.add(images);
			this.nav_arrows.nextDisabled = false;
		}
    },
};
</script>

<style lang="scss">
.blueimp-gallery {
	background: rgba($color-dark, 0.9);
	z-index: $z-index-gallery;

	@supports (backdrop-filter: blur(#{rem(20)})) {
		background: rgba($color-dark, 0.7);
		backdrop-filter: blur(#{rem(20)});
	}

	.nav-arrows {
		&__button {
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto 0;

			&--prev {
				left: rem(64);

				@include media-breakpoint-down(md) {
					left: rem(8);
				}
			}

			&--next {
				right: rem(64);

				@include media-breakpoint-down(md) {
					right: rem(8);
				}
			}
		}
	}

	&__close {
		position: absolute;
		right: rem(64);
		top: rem(64);

		@include media-breakpoint-down(md) {
			right: rem(8);
			top: rem(8);
		}
	}
}

.blueimp-gallery-text {
	position: absolute;
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	background-color: rgba($color-dark, 0.4);
	padding: rem(8) rem(8) rem(8) rem(40);
	border-radius: rem(40);
	max-width: rem(480);
	margin: 0 auto;
	left: 0;
	right: 0;
	bottom: rem(16);
	color: $color-white;

	@supports (backdrop-filter: blur(#{rem(4)})) {
		background: rgba($color-dark, 0.2);
		backdrop-filter: blur(#{rem(4)});
	}

	@include media-breakpoint-down(sm) {
		bottom: rem(4);
		left: rem(4);
		right: rem(4);
		padding: rem(4) rem(4) rem(4) rem(28);
		border-radius: rem(32);
		max-width: none;
	}

	&__content {
		padding-right: rem(16);
	}

	&__button {
		flex-shrink: 0;
	}

	&__view {
		@include text-default;
	}

	&__effect {
		@include text-small;
		opacity: 0.65;
		white-space: nowrap;
	}
}
</style>
