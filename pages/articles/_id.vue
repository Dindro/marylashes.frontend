<template>
  <div class="pt-144">
	<div class="container">
		<article-content :article_content="article_content"></article-content>
	</div>
  </div>
</template>

<script>
import ArticleContent from '&/ArticleContent';

export default {
	components: {
		ArticleContent,
	},
	asyncData(context) {
		return context.app.$axios.get('/api/v1/articles-id').then((res) => {
			return res.data;
		});
	},
}
</script>
