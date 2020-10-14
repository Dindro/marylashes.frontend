<template>
	<div class="week-time" :style="styling"></div>
</template>

<script>
export default {
	props: {
		styling: Object,
	},
}
</script>

<style lang="scss">
.week-time {
	position: absolute;

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 50%;
		background-color: $color-dark;
		width: rem(9);
		height: rem(9);
		transform: translate(-50%, -50%);
		border: 1px solid $color-light;
	}

	&::before {
		content: '';
		display: block;
		width: 100%;
		height: 1px;
		background-color: $color-dark;
		transform: translateY(-50%);
	}
}
</style>
