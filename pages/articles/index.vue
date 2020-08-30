<template>
  <div class="pt-96">
    Привет
    <nuxt-link to="/">Домой</nuxt-link>
	<div class="container">
		<hero-article :hero_article="hero_article"></hero-article>
	</div>
	<div class="container pt-md-144 pt-96">
		<card-article-list :card_article_list="card_article_list"></card-article-list>
	</div>
  </div>
</template>

<script>
import HeroArticle from '&/HeroArticle';
import CardArticleList from '&/CardArticleList';

export default {
	components: {
		HeroArticle,
		CardArticleList,
	},
	asyncData(context) {
		return context.app.$axios.get('/api/v1/articles').then((res) => {
			return res.data;
		});
	},
}
</script>

<style lang="scss">

</style>
