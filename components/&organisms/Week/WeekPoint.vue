<template>
	<div class="week-point" :class="[`week-point--${color}`]">
		<div class="week-point__box"></div>
		<span class="week-point__text">{{ text }}</span>
	</div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
	}
}
</script>

<style lang="scss">
.week-point {
	$b: #{&};
	display: inline-flex;
	align-items: center;

	&__box {
		height: rem(16);
		width: rem(16);
		border-radius: 2px;
		margin-right: rem(8);
	}

	&__text {
		@include text-small;
	}

	&--green {
		color: $color-green;

		#{$b}__box {
			background-color: $color-green-light;
		}
	}

	&--red {
		color: $color-red;

		#{$b}__box {
			background-color: $color-red-light;
		}
	}
}
</style>
