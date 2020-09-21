<template>
	<tag-link :link="link" class="link-action">
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
	align-items: flex-start;

	&__text {
		@include defaultTransition(opacity);
		@include text-default;
	}

	&__icon {
		overflow: hidden;
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
