<template>
	<div class="card-topic-list">
		<div class="card-topic-list__header">
			<h2 class="card-topic-list__title">{{ card_topic_list.title }}</h2>
			<action v-if="card_topic_list.action" :action="card_topic_list.action"></action>
		</div>
		<hr class="card-topic-list__hr">
		<div class="card-topic-list__items">
			<div class="card-topic-list__item" v-for="(item, index) in card_topic_list.items" :key="index">
				<card-topic :card="item"></card-topic>
			</div>
		</div>
	</div>
</template>

<script>
import CardTopic from '^/CardTopic';

export default {
	components: {
		CardTopic,
	},
	props: {
		card_topic_list: {
			type: Object,
			required: true,
		}
	}
}
</script>

<style lang="scss">
.card-topic-list {
	&__header {
		display: flex;
		justify-content: space-between;
	}

	&__title {
		@include h2;
		font-weight: 700;
	}

	&__hr {
		margin: rem(24) 0 rem(40);
	}

	&__items {
		@include media-breakpoint-up(lg) {
			display: flex;
			flex-wrap: wrap;
			margin: 0 rem(-20);
		}

		@include media-breakpoint-only(md) {
			column-count: 2;
			column-gap: rem(40);
		}
	}

	&__item {
		@include media-breakpoint-up(lg) {
			padding: 0 rem(20);
			width: 25%;
		}

		@include media-breakpoint-only(md) {
			margin-bottom: rem(48);
			break-inside: avoid;
		}

		@include media-breakpoint-down(sm) {
			&:not(:last-child) {
				margin-bottom: rem(40);
			}
		}
	}
}
</style>
