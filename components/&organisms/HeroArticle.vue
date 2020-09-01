<template>
	<div class="hero-article">
		<div class="hero-article__article hero-article__item">
			<h1 v-if="hero_article.title" class="hero-article__title">{{ hero_article.title }}</h1>
			<p class="hero-article__text" v-html="hero_article.text"></p>
			<card-article :card="Object.assign({}, hero_article.card, { mode: 'present' })"></card-article>
		</div>
		<div class="hero-article__themes hero-article__item">
			<card-theme-list :card_theme_list="hero_article.card_theme_list"></card-theme-list>
		</div>
	</div>
</template>

<script>
import CardThemeList from '&/CardThemeList';
import CardArticle from '^/CardArticle';

export default {
	components: {
		CardThemeList,
		CardArticle,
	},

	props: {
		hero_article: {
			card: Object,
			card_theme_list: Object,
		}
	}
}
</script>

<style lang="scss">
.hero-article {
	display: flex;

	@include media-breakpoint-up(lg) {
		margin: 0 rem(-20);
	}

	&__item {
		@include media-breakpoint-up(lg) {
			padding: 0 rem(20);
		}
	}

	&__article {
		width: calc(100% / 3 * 2);
	}

	&__themes {
		width: calc(100% / 3);
	}

	&__title {
		margin-bottom: rem(24);
		@include h2;
		font-weight: 700;
	}

	&__text {
		margin-bottom: rem(48);
		@include text-lead;
	}
}
</style>
