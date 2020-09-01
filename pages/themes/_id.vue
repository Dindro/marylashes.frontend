<template>
  <div class="pt-144">
	<div class="container">
		<hero-article :hero_article="hero_article"></hero-article>
	</div>
	<!-- <div class="container pt-md-144 pt-96">
		<card-article-list :card_article_list="card_article_list"></card-article-list>
	</div>
	<div class="container pt-md-144 pt-96">
		<card-article-slider :card_article_slider="card_article_slider"></card-article-slider>
	</div>
	<div class="container pt-md-144 pt-96">
		<card-article-list :card_article_list="card_article_list"></card-article-list>
	</div>
	<div class="container pt-md-144 pt-96">
		<card-topic-list :card_topic_list="card_topic_list"></card-topic-list>
	</div> -->
  </div>
</template>

<script>
import HeroArticle from '&/HeroArticle';
import CardArticleList from '&/CardArticleList';
import CardArticleSlider from '&/CardArticleSlider';
import CardTopicList from '&/CardTopicList';

export default {
	components: {
		HeroArticle,
		CardArticleList,
		CardArticleSlider,
		CardTopicList,
	},
	asyncData(context) {
		return context.app.$axios.get('/api/v1/themes-id').then((res) => {
			return res.data;
		});
	},
}
</script>

<style lang="scss">

</style>
