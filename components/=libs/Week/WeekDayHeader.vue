<template>
	<div class="week-day-header">
		<p class="week-day-header__name">{{ name }}</p>
		<p class="week-day-header__number" :class="{ 'is-active': active }">{{ number }}</p>
	</div>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true,
		},
		number: {
			type: Number,
			required: true,
		},
		active: {
			type: Boolean,
			default: false,
		}
	}
}
</script>

<style lang="scss">
.week-day-header {
	text-align: center;

	&__name {
		@include text-default;
		opacity: 0.65;

		@include media-breakpoint-down(sm) {
			@include text-small;
		}
	}

	&__number {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		@include h4;
		height: rem(32);
		width: rem(32);
		margin-top: rem(2);

		@include media-breakpoint-down(sm) {
			@include h5;
		}

		&.is-active {
			background-color: $color-dark;
			color: $color-white;
		}
	}
}
</style>
