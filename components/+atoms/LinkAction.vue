<template>
	<tag-link :link="link" class="link-action" :class="[ link.loading && 'is-loading', link.small && 'link-action--small' ]">
		<span class="link-action__text">{{ link.text }}</span>
		<icon class="link-action__icon" :icon="link.icon"></icon>
	</tag-link>
</template>

<script>
import TagLink from "+/TagLink";
import Icon from '+/Icon';

export default {
	components: {
		TagLink,
		Icon,
	},

	props: {
		link: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="scss">
.link-action {
	$b: #{&};

	cursor: pointer;
	display: inline-flex;
	align-items: center;

	&__text {
		@include defaultTransition(opacity);
		@include text-default;
	}

	&__icon {
		overflow: hidden;
		margin-left: rem(8);

		@include defaultTransition(opacity);
	}

	.icon {
		&--plus svg {
			@include defaultTransition(transform);
		}
	}

	&:hover {
		#{$b}__text {
			opacity: 0.65;
		}

		.icon--link svg {
			animation: diagonal-animate .4s ease .1s forwards;
		}

		.icon--plus svg {
			transform: rotate(90deg);
		}
	}

	&.is-loading {
		pointer-events: none;

		#{$b}__text {
			position: relative;

			&::after {
				content: '';
				top: 0;
				bottom: 0;
				margin: auto;
				display: block;
				height: rem(16);
      			width: rem(16);
				position: absolute;
				left: calc(100% + #{rem(8)});
				animation: $loader-spin-animation;
				border: 2px solid currentColor;
				border-radius: 50%;
				border-right-color: transparent !important;
			}
		}

		#{$b}__icon {
			opacity: 0;
		}
	}

	&--small {
		#{$b}__text {
			@include text-small;
		}

		#{$b}__icon {
			margin-left: rem(4);
		}
	}
}

@keyframes diagonal-animate {
	0% {
		transform: none;
	}
	50% {
		transform: translate(100%, -100%);
	}
	50.1% {
		transform: translate(-100%, 100%);
	}
	100% {
		transform: none;
	}
}
</style>
