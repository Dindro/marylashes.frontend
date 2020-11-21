<template>
	<transition name="modal">
		<div v-if="visible" class="modal" @click.self.stop="onClickOverlay">
			<div class="modal__content">
				<slot>
					<component v-if="component" :is="component" v-bind="componentProps" @close="onComponentClose"></component>
				</slot>
				<btn :button="button" class="modal__action" @click.native="close"></btn>
			</div>
		</div>
	</transition>
</template>

<script>
import Btn from '+/Button';

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
		}
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
		window.addEventListener('keyup', this.onEscapeKeyUp);
	},

	beforeDestroy() {
		this.$modal.subscription.$off('toggle', this.onToggle);
		window.removeEventListener('keyup', this.onEscapeKeyUp)
	},

	methods: {
		close(params) {
			// Enable scroll

			// Set hide modal
			this.visible = false;

			// Set animation
			this.$emit('closed');
		},

		open(params) {
			// Disable Scroll
			// Set visiible modal
			this.visible = true;
			// Set animations
		},

		toggle(state, params) {
			if (this.visible === state) return;

			const action = state ? this.open : this.close;
			action(params);
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
			e.which === 27 && this.$modal.hide(this.name);
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


	@include make-container-padding;

	@include media-breakpoint-down(md) {
		display: block;
		padding: 0;
		backdrop-filter: none;
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
			min-height: 100%;
		}

		@include media-breakpoint-down(sm) {
			padding: rem(40) rem($wrapper-gutter-sm-1);
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
}
</style>