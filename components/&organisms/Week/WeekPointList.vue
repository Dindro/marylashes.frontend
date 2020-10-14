<template>
	<div class="week-point-list">
		<week-point class="week-point-list__item" v-for="(item, index) in items" :key="index" v-bind="item"></week-point>
	</div>
</template>

<script>
import WeekPoint from './WeekPoint';

export default {
	components: {
		WeekPoint,
	},

	props: {
		items: {
			type: Array,
			required: true,
		}
	}
}
</script>

<style lang="scss">
.week-point-list {
	display: flex;

	&__item {
		& + & {
			margin-left: rem(24);
		}
	}
}
</style>
