<template>
	<div class="article-content">
		<info-panel :info="article_content.info"></info-panel>
		<h1 class="article-content__title">{{ article_content.title }}</h1>
		<p v-if="article_content.subtitle" class="article-content__subtitle">{{ article_content.subtitle }}</p>
		<image-vue :image="article_content.image"></image-vue>
		<div class="article-content__content">
			<!-- Author -->
			<div class="user-text" v-if="article_content.content" v-html="article_content.content"></div>
			<default-content class="user-text"></default-content>
		</div>
	</div>
</template>

<script>
import DefaultContent from '&/DefaultContent';
import ImageVue from '+/Image';
import InfoPanel from '+/InfoPanel';

export default {
	components: {
		DefaultContent,
		ImageVue,
		InfoPanel,
	},
	props: {
		article_content: {
			type: Object,
			required: true,
		}
	}
}
</script>

<style lang="scss">
@import '~assets/scss/base/user-text';
</style>
