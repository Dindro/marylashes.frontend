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
			padding: 3px 3px 0 3px;
			margin: 0;
		}
	}

	&__time {
		position: absolute;
		bottom: rem(2);
		left: rem(4);
	}

	&--hover {
		color: $color-violet;

		&::after {
			content: '';
			position: absolute;
			top: 1px;
			left: 1px;
			right: 1px;
			bottom: 1px;
			border: 1px solid $color-violet;
			border-radius: rem(2);
			background-color: rgba($color-violet, 0.2);
		}

		&#{$b}--record {
			color: $color-dark;

			&::after {
				border-color: $color-dark;
				background-color: rgba($color-dark, 0.2);
			}
		}
	}

	&--free {
		color: $color-green;
	}

	&--record {
		color: $color-red;
	}

	&--free,
	&--record {
		#{$b}__title {
			@include defaultTransition(filter);
		}
	}

	&--hovered {
		#{$b}__title {
			filter: blur(rem(3));
		}
	}

	&--opacify {
		opacity: 0.3;
	}
}
</style>
