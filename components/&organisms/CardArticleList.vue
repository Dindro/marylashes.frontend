<template>
	<div class="card-article-list">
		<div class="card-article-list__item" v-for="(item, index) in card_article_list.items" :key="index">
			<card-article :card="item"></card-article>
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
		card_article_list: {
			type: Object,
			required: true,
		}
	}
}
</script>

<style lang="scss">
.card-article-list {
	display: flex;
	flex-wrap: wrap;
	margin: rem(-32) rem(-20);

	@include media-breakpoint-down(md) {
		margin: rem(-24) rem(-12);
	}

	@include media-breakpoint-down(sm) {
		margin-top: rem(-16);
		margin-bottom: rem(-16);
	}

	&__item {
		width: calc(100% / 3);
		padding: rem(32) rem(20);

		@include media-breakpoint-down(md) {
			width: 50%;
			padding: rem(24) rem(12);
		}

		@include media-breakpoint-down(sm) {
			width: 100%;
			padding-top: rem(16);
			padding-bottom: rem(16);
		}
	}
}
</style>
