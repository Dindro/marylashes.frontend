<template>
	<div class="author">
		<image-vue v-if="author.image" class="author__avatar" :image="author.image"></image-vue>
		<div class="author__info">
			<p class="author__name">{{ author.name }}</p>
			<p v-if="author.text" class="author__text text-default">{{ author.text }}</p>
			<socials v-if="author.socials" class="author__socials" :socials="Object.assign({}, author.socials, { size: 'sm' })"></socials>
		</div>
	</div>
</template>

<script>
import ImageVue from '+/Image';
import Socials from '^/Socials';

export default {
	components: {
		ImageVue,
		Socials,
	},
	props: {
		author: {
			type: Object,
			required: true,
		}
	}
}
</script>

<style lang="scss">
.author {
	display: flex;

	&__avatar {
		flex-shrink: 0;
		height: rem(72);
		width: rem(72);
		border-radius: 50%;
		overflow: hidden;
		margin-right: rem(16);
	}

	&__name {
		@include text-lead;
		font-weight: 600;
	}
}
</style>
