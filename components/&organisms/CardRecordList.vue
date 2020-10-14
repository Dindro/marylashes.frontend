<template>
	<div class="card-record-list">
		<div class="card-record-list__item" v-for="(item, index) in card_record_list.items" :key="index">
			<card-record @select="card => $emit('select', card)" :card="item"></card-record>
		</div>
	</div>
</template>

<script>
import CardRecord from '^/CardRecord';

export default {
	components: {
		CardRecord,
	},
	props: {
		card_record_list: Object,
	},
}
</script>

<style lang="scss">
.card-record-list {
	display: flex;
	flex-wrap: wrap;
	margin: rem(-12);

	&__item {
		width: 25%;
		padding: rem(12);

		@include media-breakpoint-down(md) {
			width: 50%;
		}

		@include media-breakpoint-down(sm) {
			width: 100%;
		}
	}
}
</style>
