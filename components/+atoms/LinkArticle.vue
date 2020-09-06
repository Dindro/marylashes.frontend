<template>
	<div class="link-article" :class="[`link-article--${mode}`]">
		<div v-if="link.src" class="link-article__image">
			<image-vue :image="{ src: link.src, alt: link.alt, ratio: '5x2' }"></image-vue>
		</div>

		<tag-link class="link-article__link" :link="link">{{ link.text }}</tag-link>
	</div>
</template>

<script>
import TagLink from '+/TagLink';
import ImageVue from '+/Image';

export default {
	components: {
		TagLink,
		ImageVue,
	},
	props: {
		link: Object,
		required: true,
	},
	data: (ctx) => ({
		mode: ctx.link.src ? 'default' : 'gray',
	}),
}
</script>

<style lang="scss">
.link-article {
	&__image {
		max-width: rem(136);
		overflow: hidden;
		margin-bottom: rem(8);
		border-radius: rem(2);
	}

	&--gray {
		background-color: $color-light;
		border-radius: rem(2);
		padding: rem(16);
		margin-left: rem(-16);

		@include media-breakpoint-down(md) {
			margin-left: 0;
		}
	}
}
</style>
