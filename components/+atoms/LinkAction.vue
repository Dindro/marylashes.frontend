<template>
	<tag-link :link="link" class="link-action">
		<span class="link-action__text">{{ link.text }}</span>
		<icon class="link-action__icon" :icon="{ name: '16/link' }"></icon>
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

	display: inline-flex;
	align-items: center;

	&__text {
		@include defaultTransition(opacity);
	}

	&__icon {
		overflow: hidden;
		margin-left: rem(8);
	}

	&:hover {
		#{$b}__text {
			opacity: 0.65;
		}

		.icon--link svg {
			animation: diagonal-animate .4s ease forwards;
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
