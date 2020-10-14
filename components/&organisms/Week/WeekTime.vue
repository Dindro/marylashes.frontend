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

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 50%;
		background-color: $color-dark;
		width: rem(9);
		height: rem(9);
		transform: translate(-50%, -50%);
	}

	&::after {
		content: '';
		display: block;
		width: 100%;
		height: rem(2);
		background-color: $color-dark;
		transform: translateY(-50%);
	}
}
</style>
