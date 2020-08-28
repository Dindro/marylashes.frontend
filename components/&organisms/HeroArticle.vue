<template>
	<div class="hero-article">
		<div class="hero-article__article hero-article__item">
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
}
</style>
