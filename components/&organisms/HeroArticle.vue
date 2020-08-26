<template>
	<div class="hero-article">
		<div class="hero-article__article hero-article__item">
			<card-article :card="hero_article.card"></card-article>
		</div>
		<div class="hero-article__themes hero-article__item">
			1
		</div>
	</div>
</template>

<script>
import CardArticle from '^/CardArticle';

export default {
	components: {
		CardArticle,
	},

	props: {
		hero_article: {
			card: Object,
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
