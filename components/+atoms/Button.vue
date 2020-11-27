<template>
	<tag-link
		:link="button"
		:class="[
			button.color && `button--${button.color}`,
			button.round && 'button--round',
			!button.text && button.icon && 'button--morphing',
			button.size && `button--${button.size}`,
			button.loading && `button--loading`,
			button.fit && 'button--fit',
			button.fit_sm && 'button--fit--sm',
			button.shake && 'button--shake',
			button.hidden && 'button--hidden',
		]"
		:disabled="button.disabled"
		:title="button.title"
		:tag="button.tag || 'button'"
		class="button"
	>
		<icon-vue class="button__icon" v-if="button.icon" :icon="button.icon"></icon-vue>
		<span class="button__text" v-if="button.text">{{ button.text }}</span>
		<spinner :spinner="spinner" class="button__spinner"></spinner>
	</tag-link>
</template>

<script>
import TagLink from '+/TagLink';
import IconVue from '+/Icon';
import Spinner from '+/Spinner';

export default {
	components: {
		TagLink,
		IconVue,
		Spinner,
	},

	props: {
		button: {
			type: Object,
			required: true,
		}
	},

	computed: {
		spinner() {
			return this.button.spinner || { size: 'sm' }
		}
	}
}
</script>

<style lang="scss">
.button {
    $b: #{&};

    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 rem(32);
    text-align: center;
    border: none;
    border-radius: 0;
    background: none;
    height: rem($button-height);
    white-space: nowrap;
    position: relative;
    overflow: hidden;
	cursor: pointer;
	user-select: none;
	outline: none !important;

	@include defaultTransition(color);

	@include media-breakpoint-down(sm) {
		height: rem($button-height-sm);
	}

	&__icon {
		position: relative;
	}

    &__text {
		position: relative;
		@include defaultTransition(transform);
		@include text-default;
	}

	&__spinner {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	&::before {
		content: '';
		pointer-events: none;
		height: rem(10);
		width: rem(10);
		border-radius: 50%;
		position: absolute;
		margin: auto;
		opacity: 0;
		@include defaultTransition(transform, opacity, background-color);
    }

	&:disabled,
	&.disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	&.disabled {
		pointer-events: none !important;
	}

	@mixin hover-disabled {
		&:hover:not(.disabled):not(:disabled) {
			@content;
		}
	}

	@include hover-disabled {
		&::before {
			transform: scale(32);
			opacity: 1;
		}

		#{$b}__text {
			transform: scale(0.9);
		}
	}

	&--loading {
		pointer-events: none !important;

		#{$b}__spinner {
			opacity: 1;
		}

		#{$b}__icon,
		#{$b}__text {
			color: transparent !important;
		}
	}

	&--default,
    &--dark {
		background-color: $color-dark;
		color: $color-white;

		@include hover-disabled {
			color: $color-dark;

			&::before {
				background-color: $color-saphire;
			}
		}
    }


    // --white при ховере
    &--dark--white {
		background-color: $color-dark;
		color: $color-white;

		@include hover-disabled {
			color: $color-dark;

			&::before {
				background-color: $color-white;
			}
		}
    }

    &--outline-dark {
		border: 1px solid $color-dark;
		background-color: transparent;
		color: $color-dark;

		&::before {
			background-color: $color-dark;
		}

		@include hover-disabled {
			color: $color-white;
		}
	}

	&--white {
		background-color: $color-white;
		color: $color-dark;

		&::before {
			background-color: $color-dark;
		}

		@include hover-disabled {
			color: $color-white;
		}
	}

    &--outline-white {
		border: 1px solid $color-white;
		background-color: transparent;
		color: $color-white;

		&::before {
			background-color: $color-white;
		}

		@include hover-disabled {
			color: $color-dark;
		}
    }

    &--saphire {
		background-color: $color-saphire;
		color: $color-dark;

		&::before {
			background-color: $color-dark;
		}

		@include hover-disabled {
			color: $color-white;
		}
    }

    &--outline-saphire {
		border: 1px solid $color-saphire;
		background-color: transparent;
		color: $color-saphire;

		&::before {
			background-color: $color-saphire;
		}

		@include hover-disabled {
			color: $color-dark;
		}
	}

	&--transparent {
		background-color: transparent;
		color: $color-white;

		&::before {
			background-color: $color-white;
		}

		@include hover-disabled {
			color: $color-dark;
		}
	}

	&--transparent-dark {
		background-color: transparent;
		color: $color-dark;

		&::before {
			background-color: $color-dark;
		}

		@include hover-disabled {
			color: $color-white;
		}
	}

	&--round {
		border-radius: rem(($button-height / 2));

		&#{$b}--lg {
			border-radius: rem(($button-height--size--lg / 2));
		}
	}

	&--morphing {
		padding: 0;
		min-width: auto;
		width: rem($button-height);
		perspective: rem(400);
		overflow: initial;

		&::before {
			opacity: 0;
			transform: translateY(#{rem(16)}) rotateX(50deg);
			height: 100%;
			width: 100%;
		}

		@include hover-disabled {
			&::before {
				opacity: 1;
				transform: none;
			}
		}

		&:active:not(.disabled):not(:disabled) {
			&::before {
				transform: scale(1.1) !important;
				transition-duration: 0.1s;
			}
		}

		@include media-breakpoint-down(sm) {
			width: rem($button-height-sm);
		}

		&#{$b}--lg {
			width: rem($button-height--size--lg);

			@include media-breakpoint-down(sm) {
				width: rem($button-height-sm--size--lg);
			}
		}
	}

	&--lg {
		height: rem($button-height--size--lg);

		@include media-breakpoint-down(sm) {
			height: rem($button-height-sm--size--lg);
		}
	}

	&--fit {
		width: 100%;

		&--sm {
			@include media-breakpoint-down(sm) {
				width: 100%;
			}
		}
	}

	&--shake {
		animation: shake $timing $easing forwards;
	}

	&--hidden {
		display: none;
	}
}

@keyframes shake {
	20%,
	60% {
		transform: translateX(#{rem(8)});
	}

	40%,
	80% {
		transform: translateX(#{rem(-8)});
	}
}
</style>
