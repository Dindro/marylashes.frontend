<template>
	<div class="nav-arrows" :class="[nav_arrows.color && `nav-arrows--${nav_arrows.color}`]">
		<button ref="prev" class="nav-arrows__button nav-arrows__button--prev" title="Назад" aria-label="Назад">
			<icon :icon="{ name: '24/arrow-left' }"></icon>
		</button>
		<button ref="next" class="nav-arrows__button nav-arrows__button--next" title="Вперёд" aria-label="Вперёд">
			<icon :icon="{ name: '24/arrow-right' }"></icon>
		</button>
		<slot name="after"></slot>
	</div>
</template>

<script>
import Icon from '+/Icon';

export default {
  components: {
    Icon,
  },

	props: {
		nav_arrows: {
			type: Object,
			default: () => ({}),
		},
	},

  methods: {
    getNavigation() {
      return {
        prev: this.$refs.prev,
        next: this.$refs.next,
      }
    }
  },
};
</script>

<style lang="scss">
.nav-arrows {
	$b: #{&};
  	display: inline-flex;

	&__button {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: rem(80);
		height: rem(80);
		outline: none !important;
		border: none;
		background: none;
		padding: 0;
		perspective: 400px;
		color: $color-white;

		@include defaultTransition(color, opacity);

		@include media-breakpoint-down(sm) {
			width: rem(64);
			height: rem(64);
		}

		&::before {
			content: '';
			position: absolute;
			pointer-events: none;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			border-radius: 50%;
			background-color: $color-white;
			opacity: 0;
			transform: translateY(#{rem(16)}) rotateX(50deg);
			@include defaultTransition(opacity, transform);
		}

		&:hover:not(.disabled) {
			color: $color-dark;

			&::before {
				opacity: 1;
				transform: none;
			}
		}

		&:active {
			&::before {
				transform: scale(1.1) !important;
				transition-duration: 0.1s;
			}
		}

		&.disabled {
			opacity: 0.3;
			pointer-events: none !important;
		}
	}

	&--dark {
		#{$b}__button {
			color: $color-dark;

			&::before {
				background-color: $color-dark;
			}

			&:hover:not(.disabled) {
				color: $color-white;
			}
		}
	}

	.icon {
		position: relative;
	}
}
</style>
