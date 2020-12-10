<template>
	<transition name="modal" @after-leave="onAfterClose">
		<div
			v-if="visible"
			class="modal"
			:class="[
				size && `modal--size--${size}`,
				indent && `modal--indent--${indent}`,
			]"
			@click.self.stop="onClickOverlay"
			data-scroll-lock-scrollable>
			<div class="modal__content">
				<slot>
					<component v-if="component" :is="component" v-bind="componentProps" @close="onComponentClose"></component>
				</slot>
				<btn v-if="closeButton" :button="button" class="modal__action" @click.native="close"></btn>
			</div>
		</div>
	</transition>
</template>

<script>
import Btn from '+/Button';
import { disableScroll, enableScroll } from '~/utils/scroll';

export default {
	components: {
		Btn,
	},

	props: {
		name: {
			type: String,
			required: true,
		},
		component: {
			type: [Object, Function]
		},
		componentProps: {
			type: [Object]
		},
		closeButton: {
			type: [Boolean, Object],
			default: true,
		},
		size: {
			type: String,
			default: 'lg',
			validator: value => ['sm', 'md', 'lg', 'space-around'].indexOf(value) !== -1,
		},
		indent: {
			type: String,
			default: 'default',
			validator: value => ['equal', 'equal-action', 'default'].indexOf(value) !== -1,
		},
	},

	data: () => ({
		visible: false,
		button: {
			icon: { name: '24/cross' },
			round: true,
			color: 'transparent-dark',
			size: 'lg'
		}
	}),

	beforeMount() {
		this.$modal.subscription.$on('toggle', this.onToggle);
		this.$modal.subscription.$on('status', this.onStatus);
		window.addEventListener('keyup', this.onEscapeKeyUp);
	},

	beforeDestroy() {
		this.$modal.subscription.$off('toggle', this.onToggle);
		this.$modal.subscription.$off('status', this.onStatus);
		window.removeEventListener('keyup', this.onEscapeKeyUp);
	},

	methods: {
		close(params) {
			// Set hide modal
			this.visible = false;

			// Emit event
			this.$emit('closed');
		},

		// Вызывается после завершения анимации
		onAfterClose() {
			enableScroll();
		},

		open(params) {
			// Disable Scroll
			disableScroll();

			// Set visiible modal
			this.visible = true;
		},

		toggle(state, params) {
			if (this.visible === state) return;

			const action = state ? this.open : this.close;
			action(params);
		},

		onStatus(name) {
			if (this.name !== name) return;

			this.$modal.subscription.status = {
				open: this.visible,
				id: this.name,
			};
		},

		onComponentClose() {
			this.close();
		},

		onToggle(name, state, params) {
			if (this.name !== name) return;

			const nextState = typeof state === 'undefined' ? !this.visible : state;
			this.toggle(nextState, params);
		},

		onClickOverlay() {
			process.env.NODE_ENV === 'development' && console.log('modal overlay click');
			this.close();
		},

		onEscapeKeyUp(e) {
			e.which === 27 && this.close();
		},
	},
}
</script>

<style lang="scss">
.modal {
	$b: #{&};

	position: fixed;
	display: flex;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	backdrop-filter: blur(rem(10));
	z-index: $z-index-modal;
	background-color: rgba($color-dark, 0.35);
	padding-top: rem(64);
	padding-bottom: rem(64);
	overflow-y: auto;

	@include make-container-padding;

	@include media-breakpoint-down(md) {
		display: block;
		padding: 0;
		backdrop-filter: none;
	}

	&-enter {
		opacity: 0;

		#{$b}__content {
			opacity: 0;
			transform: translateY(#{rem(40)});
		}
	}

	&-leave-to {
		opacity: 0;

		#{$b}__content {
			opacity: 0;
			transform: translateY(#{rem(-40)});
		}
	}

	&-enter-active {
		transition: opacity $timing $easing;

		#{$b}__content {
			transition: transform $timing $easing 0.1s, opacity $timing $easing 0.1s;
		}
	}

	&-leave-active {
		transition: opacity $timing $easing 0.2s;

		#{$b}__content {
			transition: transform $timing $easing, opacity $timing $easing;
		}
	}


	&__content {
		width: 100%;
		margin: auto;
		position: relative;
		background: $color-white;
		padding: rem(64);

		@include media-breakpoint-up(lg) {
			border-radius: rem(2);
		}

		@include media-breakpoint-down(md) {
			padding-left: rem($wrapper-gutter-md-1);
			padding-right: rem($wrapper-gutter-md-1);
			min-height: $height-screen;
		}

		@include media-breakpoint-down(sm) {
			padding: rem(40) rem($wrapper-gutter-sm-1);
		}

		& > .spinner-block {
			min-height: rem(128);
		}
	}

	&__action {
		position: absolute;
		top: rem(64 - $indent-arrows);
		right: rem(64 - $indent-arrows);

		@include media-breakpoint-down(md) {
			right: rem($wrapper-gutter-md-1 - $indent-arrows);
		}

		@include media-breakpoint-down(sm) {
			top: rem(40 - $indent-arrows-sm);
			right: rem($wrapper-gutter-sm-1 - $indent-arrows-sm);
		}
	}

	&--size {
		&--lg,
		&--md {
			// Делаем спиннер на всю область экрана
			#{$b}__content > .spinner-block {
				@include media-breakpoint-down(md) {
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					width: 100%;
					pointer-events: none;
				}
			}
		}

		&--md {
			#{$b}__content {
				@include media-breakpoint-up(lg) {
					max-width: rem(768);
				}
			}
		}

		&--sm {
			#{$b}__content {
				@include media-breakpoint-up(lg) {
					max-width: rem(768);
				}
			}
		}

		&--sm,
		&--space-around {
			@include media-breakpoint-down(md) {
				display: flex;
				padding-top: rem(64);
				padding-bottom: rem(64);
			}

			@include media-breakpoint-down(sm) {
				padding-top: rem(20);
				padding-bottom: rem(20);
			}

			#{$b}__content {
				@include media-breakpoint-down(md) {
					margin: auto;
					min-height: auto;
				}

				@include media-breakpoint-only(md) {
					max-width: rem(640);
				}

				@include media-breakpoint-down(sm) {
					max-width: rem(320);
				}
			}
		}
	}

	&--indent {
		&--equal,
		&--equal-action {
			#{$b}__content {
				@include media-breakpoint-down(md) {
					padding-top: rem($wrapper-gutter-md-1);
					padding-bottom: rem($wrapper-gutter-md-1);
				}

				@include media-breakpoint-down(sm) {
					padding-top: rem($wrapper-gutter-sm-1);
					padding-bottom: rem($wrapper-gutter-sm-1);
				}
			}

			#{$b}__action {
				@include media-breakpoint-down(md) {
					top: rem($wrapper-gutter-md-1 - $indent-arrows);
				}

				@include media-breakpoint-down(sm) {
					top: rem($wrapper-gutter-sm-1 - $indent-arrows-sm);
				}
			}
		}

		&--equal-action {
			#{$b}__content {
				@include media-breakpoint-up(lg) {
					padding-top: rem(120);
				}

				@include media-breakpoint-down(md) {
					padding-top: rem(104);
				}

				@include media-breakpoint-down(sm) {
					padding-top: rem(72);
				}
			}
		}
	}
}
</style>
