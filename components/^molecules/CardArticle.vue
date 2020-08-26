<template>
	<div class="card-article" :class="[`card-article--${mode ? mode : 'default'}`]">
		<div class="card-article__image">
			<image-vue v-if="card.image" :image="card.image"></image-vue>
		</div>
		<div class="card-article__content">
			<h3 class="card-article__title">{{ card.title }}</h3>
			<info-panel class="card-article__info" :info="card.info"></info-panel>
		</div>
		<tag-link class="card-article__link" :link="card.link"></tag-link>
	</div>
</template>

<script>
import TagLink from '+/TagLink';
import InfoPanel from '+/InfoPanel';
import ImageVue from '+/Image';

export default {
	components: {
		TagLink,
		ImageVue,
		InfoPanel,
	},

	props: {
		card: {
			mode: String,
			image: Object,
			title: String,
			info: Object,
			author: Object,
			link: Object,
		}
	},

	data: (context) => ({
		mode: context.card.image ? context.card.mode : 'gray',
	}),
}
</script>

<style lang="scss">

</style>
