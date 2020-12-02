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

	@include media-breakpoint-down(sm) {
		flex-wrap: wrap;
		margin: rem(-8) 0 0 rem(-8);
	}

	&__item {
		@include media-breakpoint-up(md) {
			& + & {
				margin-left: rem(20);
			}
		}

		@include media-breakpoint-down(sm) {
			padding: rem(8) 0 0 rem(8);
		}
	}
}
</style>
