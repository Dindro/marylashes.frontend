<template>
	<div class="week-time" :style="lineStile">
		<div class="week-time__circle" :style="circleStyle"></div>
	</div>
</template>

<script>
export default {
	props: {
		styling: Object,
	},

	computed: {
		lineStile() {
			return {
				top: this.styling.top,
			};
		},

		circleStyle() {
			return {
				left: this.styling.left,
			};
		},
	},
}
</script>

<style lang="scss">
.week-time {
	pointer-events: none;
	position: absolute;
	left: 1px;
	right: 1px;
	height: 1px;
	background-color: rgba($color-dark, 0.65);

	&__circle {
		top: 0;
		position: absolute;
		border-radius: 50%;
		background-color: $color-dark;
		width: rem(9);
		height: rem(9);
		transform: translate(-50%, -50%);
		border: 1px solid $color-light;
	}
}
</style>
