<template>
	<tag-link :link="link" class="link-action" :class="[ link.loading && 'link-action--loading', link.small && 'link-action--small' ]">
		<span class="link-action__text">{{ link.text }}</span>
		<transition :duration="300" name="fade" mode="out-in">
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
