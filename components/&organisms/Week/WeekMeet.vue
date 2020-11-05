<template>
	<div class="week-meet" :class="classes" :style="styling">
		<span class="week-meet__title" v-if="title">{{ title }}</span>
		<span class="week-meet__time" v-if="time">{{ time }}</span>
	</div>
</template>

<script>
export default {
	props: {
		type: [Array, String],
		styling: Object,
		title: String,
		time: String,
	},

	computed: {
		classes() {
			if (!this.type) return;

			const block = 'week-meet';
			const types = typeof this.type === 'string' && [ this.type ] || this.type;
			const classes = types.map(mod => `${block}--${mod}`);
			return classes.join(' ');
		}
	},
}
</script>

<style lang="scss">
.week-meet {
	$b: #{&};

	display: flex;
	position: absolute;
	pointer-events: none;
	@include text-small;

	@include media-breakpoint-down(sm) {
		font-size: rem(10);
		line-height: 1;
	}

	&__title {
		margin: auto;
		text-align: center;
		padding: 0 2px;

		@include media-breakpoint-down(sm) {
			text-align: left;
			word-break: break-word;
			padding: 3px 2px 0 2px;
			margin: 0;
		}
	}

	&__time {
		position: absolute;
		bottom: rem(2);
		left: rem(4);

		@include media-breakpoint-down(sm) {
			bottom: 3px;
			left: 2px;
			text-align: left;
		}
	}

	&--hover {
		color: $color-dark;

		&::after {
			content: '';
			position: absolute;
			top: 1px;
			left: 1px;
			right: 1px;
			bottom: 1px;
			border: 1px solid $color-dark;
			border-radius: rem(2);
			background-color: rgba($color-dark, 0.2);
		}

		&#{$b}--free {
			color: $color-violet;

			&::after {
				border-color: $color-violet;
				background-color: rgba($color-violet, 0.2);
			}
		}
	}

	&--free {
		color: $color-green;

		#{$b}__title {
			@include defaultTransition(filter);
		}
	}

	&--opacify {
		opacity: 0.3;
	}
}
</style>
