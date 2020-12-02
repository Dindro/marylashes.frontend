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
		flex-shrink: 0;

		@include media-breakpoint-down(sm) {
			margin-right: rem(4);
			width: rem(12);
			height: rem(12);
		}
	}

	&__text {
		@include text-small;

		@include media-breakpoint-down(sm) {
			font-size: rem(10);
		}
	}

	&--green {
		color: $color-green;

		#{$b}__box {
			background-color: $color-green-light;
		}
	}

	&--violet {
		color: $color-violet;

		#{$b}__box {
			background-color: rgba($color-violet, 0.3);
		}
	}

	&--dark {
		color: $color-dark;

		#{$b}__box {
			background-color: rgba($color-dark, 0.3);
		}
	}
}
</style>
