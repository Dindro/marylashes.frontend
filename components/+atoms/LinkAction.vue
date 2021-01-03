<template>
	<tag-link
		:link="link"
		class="link-action"
		:class="[
			link.loading && 'link-action--loading',
			link.small && 'link-action--small',
			link.shake && 'link-action--shake',
			link.icon && 'has-icon'
		]"
		:tag="link.tag || 'span'">
		<span class="link-action__text">{{ link.text }}</span>
		<transition v-if="link.icon" :duration="300" name="fade" mode="out-in">
			<icon v-if="!link.loading" class="link-action__icon" :icon="link.icon" key="icon"></icon>
			<spinner v-else class="link-action__spinner" :spinner="{ size: 'xss' }" key="spinner"></spinner>
		</transition>
	</tag-link>
</template>

<script>
import TagLink from "+/TagLink";
import Icon from '+/Icon';
import Spinner from '+/Spinner';

export default {
	components: {
		TagLink,
		Icon,
		Spinner,
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
	padding: 0;
	border: none;
	background: none;
	outline: none;

	&__text {
		@include defaultTransition(opacity);
		@include text-default;
	}

	&__icon {
		overflow: hidden;
		margin-left: rem(8);
	}

	&__spinner {
		margin-left: rem(8);
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

	&--loading {
		pointer-events: none;
	}

	&--small {
		#{$b}__text {
			@include text-small;
		}

		#{$b}__icon {
			margin-left: rem(4);
		}
	}

	&--shake {
		animation: shake $timing $easing forwards;
	}

	&:not(.has-icon) {
		&#{$b}--loading {
			#{$b}__text {
				background-size: 0% 1px;
				background-position: 50% 100%;
				background-image: linear-gradient(currentColor, currentColor);
				background-repeat: no-repeat;
				animation: line-loading-animate .7s linear infinite;
			}
		}
	}
}

@keyframes line-loading-animate {
	0% {
		background-size: 0% 1px;
	}
	50% {
		background-size: 50% 1px;
	}
	100% {
		background-size: 0% 1px;
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

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  	transition: opacity $timing $easing;
}
.fade-enter,
.fade-leave-to {
  	opacity: 0;
}
</style>
