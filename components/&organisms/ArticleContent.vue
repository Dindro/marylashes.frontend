<template>
	<div class="article-content">
		<info-panel class="article-content__info" :info="article_content.info"></info-panel>
		<h1 class="article-content__title">{{ article_content.title }}</h1>
		<p v-if="article_content.subtitle" class="article-content__subtitle">{{ article_content.subtitle }}</p>
		<image-vue class="article-content__image" :image="Object.assign({}, article_content.image, { ratio: '5x2'})"></image-vue>
		<div class="article-content__content">
			<!-- Author -->
			<div class="user-text" v-if="article_content.content" v-html="article_content.content"></div>
			<default-content class="user-text"></default-content>
		</div>
		<info-panel class="article-content__tags" :info="Object.assign({}, article_content.info, { tags: article_content.tags })"></info-panel>
		<socials-share class="article-content__share" :socials="share"></socials-share>
	</div>
</template>

<script>
import DefaultContent from '&/DefaultContent';
import SocialsSahre from '^/SocialsShare';
import ImageVue from '+/Image';
import InfoPanel from '+/InfoPanel';
import VRuntimeTemplate from "v-runtime-template";

export default {
	components: {
		DefaultContent,
		SocialsSahre,
		ImageVue,
		InfoPanel,
		VRuntimeTemplate,
	},
	props: {
		article_content: {
			type: Object,
			required: true,
		}
	},
	data: (ctx) => ({
		share: {
			title: ctx.article_content.title,
			text: ctx.article_content.subtitle || '',
			image: ctx.article_content.image.src || '',
		},
	}),
}
</script>

<style lang="scss">
@import '~assets/scss/base/user-text';

.article-content {
	&__info {
		margin-bottom: rem(8);
	}

	&__title {
		@include h2;
		font-weight: 700;
		max-width: rem(670);
	}

	&__subtitle {
		margin-top: rem(8);
	}

	&__image {
		margin-top: rem(40);
	}

	&__content {
		margin-top: rem(80);
		margin-bottom: rem(64);
	}

	&__share {
		margin-top: rem(8);
	}
}
</style>
