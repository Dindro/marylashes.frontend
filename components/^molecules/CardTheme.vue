<template>
	<div class="card-theme">
		<image-vue class="card-theme__image" :image="card.image"></image-vue>
		<div class="card-theme__content">
			<h3 class="card-theme__title">
				<tag-link :link="card.link">
					{{ card.title }}
				</tag-link>
			</h3>
			<p class="card-theme__count">{{ card.count }} {{ card.count_label }}</p>
		</div>
	</div>
</template>

<script>
import ImageVue from '+/Image';
import TagLink from '+/TagLink';

export default {
	components: {
		ImageVue,
		TagLink,
	},
	props: {
		card: {
			link: Object,
			image: Object,
			title: String,
			count: Number,
			count_label: String,
		}
	}
}
</script>

<style lang="scss">
.card-theme {
	display: flex;

	& + & {
		margin-top: rem(24);
	}

	&__image {
		width: rem(64);
		height: rem(64);
		border-radius: rem(8);
		margin-right: rem(16);
	}

	&__title {
		max-width: rem(160);
		@include h5;
	}

	&__count {
		margin-top: rem(4);
		opacity: 0.3;
		@include text-small;
	}
}
</style>
