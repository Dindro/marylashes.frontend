<template>
  <div class="pt-96">
    Привет
    <nuxt-link to="/">Домой</nuxt-link>
	<div class="container">
		<hero-article :hero_article="hero_article"></hero-article>
	</div>
  </div>
</template>

<script>
import HeroArticle from '&/HeroArticle';

export default {
	components: {
		HeroArticle,
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
