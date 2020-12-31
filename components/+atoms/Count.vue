<template>
	<div class="count">
		{{ count.value }}
	</div>
</template>

<script>
export default {
	props: {
		count: {
			type: Object,
			required: true,
		},
	},
}
</script>

<style lang="scss">
.count {
	display: inline-flex;
	background-color: $color-saphire;
	color: $color-black;
	align-items: center;
	justify-content: center;
	height: rem(24);
	min-width: rem(24);
	border-radius: rem(12);

	@include text-default;
}
</style>
