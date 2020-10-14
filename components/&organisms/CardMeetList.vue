<template>
	<div class="card-meet-list">
		<p class="card-meet-list__title text-default">{{ card_meet_list.title }}</p>
		<div class="card-meet-list__items">
			<card-meet class="card-meet-list__item" v-for="(item, index) in card_meet_list.items" :key="index" :card="item" @delete="emit('delete', $card)"></card-meet>
		</div>
	</div>
</template>

<script>
import CardMeet from '^/CardMeet';

export default {
	components: {
		CardMeet,
	},
	props: {
		card_meet_list: Object,
	},
}
</script>

<style lang="scss">
.card-meet-list {
	&__title {
		@include text-default;
		margin-bottom: rem(8);
	}

	&__items {
		display: flex;
		flex-wrap: wrap;
		margin-left: rem(-8);
		margin-top: rem(-8);
	}

	&__item {
		margin-left: rem(8);
		margin-top: rem(8);
	}
}
</style>
