<template>
	<div class="card-article" :class="[`card-article--${type ? type : 'default'}`]">
		<div class="card-article__image">
			<image-vue v-if="card.image" :image="card.image"></image-vue>
		</div>
		<div class="card-article__content">
			<h3 class="card-article__title">{{ card.title }}</h3>
			<div class="card-article__info">

			</div>
		</div>
		<tag-link class="card-article__link" :link="card.link"></tag-link>
	</div>
</template>

<script>
import TagLink from '+/TagLink';
import { Image as ImageVue } from '+/Image';

export default {
	components: {
		TagLink,
		ImageVue,
	},

	props: {
		card: {
			type: String,
			image: Object,
			title: String,
			data: Date,
			view: Number,
			author: Object,
			link: Object,
		}
	},

	data: (context) => ({
		type: context.image ? context.type : 'gray',
	}),
}
</script>

<style lang="scss">

</style>
