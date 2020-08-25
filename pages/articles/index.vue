<template>
  <div class="pt-96">
    Привет
    <nuxt-link to="/">Домой</nuxt-link>
	<div class="container">
		<hero-article></hero-article>
	</div>
  </div>
</template>

<script>
import HeroArticle from '&/HeroArticle';
export default {
	components: {
		HeroArticle,
	},
}
</script>

<style lang="scss" scoped>

</style>
