<template>
	<div class="article-content">
		<info-panel class="article-content__info" :info="article_content.info"></info-panel>
		<h1 class="article-content__title">{{ article_content.title }}</h1>
		<p v-if="article_content.subtitle" class="article-content__subtitle">{{ article_content.subtitle }}</p>
		<div class="article-content__image">
			<image-vue :image="Object.assign({}, article_content.image, { ratio: '5x2'})"></image-vue>
		</div>
		<div class="article-content__content">
			<author class="article-content__author" :author="article_content.author"></author>
			<v-runtime-template class="user-text" v-if="article_content.content" v-html="article_content.content"></v-runtime-template>
			<default-content class="user-text"></default-content>
		</div>
		<info-panel class="article-content__tags" :info="Object.assign({}, article_content.info, { tags: article_content.tags })"></info-panel>
		<socials-share class="article-content__share" :socials="share"></socials-share>
	</div>
</template>

<script>
import DefaultContent from '&/DefaultContent';
import SocialsShare from '^/SocialsShare';
import Author from '^/Author';
import ImageVue from '+/Image';
import InfoPanel from '+/InfoPanel';
import VRuntimeTemplate from "v-runtime-template";

export default {
	components: {
		DefaultContent,
		SocialsShare,
		Author,
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
		max-width: rem(670);
	}

	&__subtitle {
		margin-top: rem(8);
	}

	&__image {
		margin-top: rem(40);

		@include media-breakpoint-down(md) {
			margin-left: rem(-$wrapper-gutter-md-1);
			margin-right: rem(-$wrapper-gutter-md-1);
		}

		@include media-breakpoint-down(sm) {
			margin-top: rem(24);
			margin-left: rem(-$wrapper-gutter-sm-1);
			margin-right: rem(-$wrapper-gutter-sm-1);
		}
	}

	&__content {
		position: relative;
		margin-top: rem(80);
		margin-bottom: rem(64);

		@include media-breakpoint-down(sm) {
			margin-top: rem(64);
		}
	}

	&__author {
		position: absolute;
		top: 0;
		right: 0;
		width: rem(374);

		@include media-breakpoint-down(md) {
			position: static;
			margin-bottom: rem(24);
		}

		@include media-breakpoint-down(sm) {
			margin-bottom: rem(8);
		}
	}

	&__share {
		margin-top: rem(8);
	}
}
</style>
