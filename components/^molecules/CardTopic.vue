<template>
	<div class="card-topic">
		<card-theme :card="card.theme"></card-theme>
		<ul class="card-topic__items" v-if="card.items">
			<li v-for="(item, index) in card.items" :key="index">
				<tag-link class="card-topic__item" :link="item"></tag-link>
			</li>
		</ul>

		<action v-if="card.action" class="card-topic__action" :action="card.action"></action>
	</div>
</template>

<script>
import TagLink from '+/TagLink';
import CardTheme from '^/CardTheme';

export default {
	components: {
		CardTheme,
		TagLink,
	},

	props: {
		card: {
			type: Object,
			required: true,
		}
	},
}
</script>

<style lang="scss">
.card-topic {
	&__items {
		margin-top: rem(24);
		margin-bottom: 0;
		padding: 0;
		list-style: none;

		@include media-breakpoint-down(md) {
			margin-top: rem(16);
		}

		li {
			&:not(:last-child) {
				margin-bottom: rem(16);

				@include media-breakpoint-down(sm) {
					margin-bottom: rem(8);
				}
			}
		}
	}

	&__item {
		@include text-small;
		@include line-animate-over;
	}

	&__action {
		margin-top: rem(32);

		@include media-breakpoint-down(sm) {
			margin-top: rem(24);
		}
	}
}
</style>
