<template>
	<tag-link
		:link="button"
		:class="[
			button.color && `button--${button.color}`,
			button.round && 'button--round',
			!button.text && button.icon && 'button--morphing',
			button.size && `button--${button.size}`,
		]"
		tag="button"
		class="button"
	>
		<icon-vue class="button__icon" v-if="button.icon" :icon="button.icon"></icon-vue>
		<span class="button__text" v-if="button.text">{{ button.text }}</span>
	</tag-link>
</template>

<script>
import TagLink from '+/TagLink';
import IconVue from '+/Icon';

export default {
	components: {
		TagLink,
		IconVue,
	},

	props: {
		button: {
			type: Object,
			required: true,
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
    height: rem(60);
    white-space: nowrap;
    position: relative;
    overflow: hidden;
	cursor: pointer;
	outline: none !important;

	@include defaultTransition(color);

	@include media-breakpoint-down(sm) {
		height: rem(56);
	}

	&__icon {
		position: relative;
	}

    &__text {
      position: relative;
      @include defaultTransition(transform);
      @include text-default;
    }

    &::before {
      content: '';
      background-color: $color-saphire;
      height: rem(10);
      width: rem(10);
      border-radius: 50%;
      position: absolute;
      margin: auto;
      opacity: 0;
      @include defaultTransition(transform, opacity);
    }

    &:hover {
      color: $color-dark;

      &::before {
        transform: scale(30);
        opacity: 1;
      }

      #{$b}__text {
        transform: scale(0.9);
      }
    }

    &,
    &--dark,
    &--default {
      background-color: $color-dark;
      color: $color-white;
    }

    // --white при ховере
    &--dark--white {
      &:hover {
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

      &:hover {
        color: $color-white;
      }
	}

	&--white {
		background-color: $color-white;
		color: $color-dark;

		&::before {
			background-color: $color-dark;
		}

		&:hover {
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

      &:hover {
        color: $color-dark;
      }
    }

    &--saphire {
      background-color: $color-saphire;
      color: $color-dark;

      &::before {
        background-color: $color-dark;
      }

      &:hover {
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

      &:hover {
        color: $color-dark;
      }
	}

	&--transparent {
		background-color: transparent;
		color: $color-white;

		&::before {
			background-color: $color-white;
		}

		&:hover {
			color: $color-dark;
		}
	}

	&--round {
		border-radius: rem(30);

		&#{$b}--lg {
			border-radius: rem(36);
		}
	}

	&--morphing {
		padding: rem(0) rem(18);
		min-width: auto;

		&#{$b}--lg {
			padding: rem(0) rem(24);

			@include media-breakpoint-down(sm) {
				padding: rem(0) rem(26);
			}
		}
	}

	&--lg {
		height: rem(72);
	}
}
</style>
