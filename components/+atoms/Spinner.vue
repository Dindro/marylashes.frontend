<template>
	<svg class="spinner" :class="[ spinner.size && `spinner--${spinner.size}` ]" width="48" height="48" viewBox="0 0 48 48">
		<circle class="spinner__ring spinner__circle" cx="24" cy="24" r="19" fill="none" stroke="currentColor"></circle>
		<circle class="spinner__half spinner__circle" cx="24" cy="24" r="19" fill="none" stroke="currentColor"></circle>
	</svg>
</template>

<script>
export default {
	props: {
		spinner: {
			type: Object,
			default: () => ({}),
		}
	}
}
</script>

<style lang="scss">
.spinner {
	$b: #{&};

	width: rem(48);
	height: rem(48);
	animation: spinner-loader-main 1.4s infinite linear;

	&__ring {
		opacity: 0.3;
	}

	&__half {
		stroke-linecap: round;
		stroke-dashoffset: 0;
		stroke-dasharray: 90 120;
		transform-origin: 50% 50%;
		transform: rotate(45deg);
		animation: spinner-loader 1.4s infinite;
	}

	&__circle {
		stroke-width: 2;
	}

	&--sm {
		width: rem(32);
		height: rem(32);

		#{$b}__circle {
			stroke-width: 3;
		}
	}

	&--xss {
		width: rem(16);
		height: rem(16);

		#{$b}__circle {
			stroke-width: 5;
		}
	}
}

@keyframes spinner-loader {
	0%, 20% {
		stroke-dashoffset: 0;
		transform: rotate(0);
	}

	50%, 70% {
		stroke-dashoffset: 80;
		transform: rotate(270deg);
	}

	100% {
		stroke-dashoffset: 0;
		transform: rotate(360deg);
	}
}

@keyframes spinner-loader-main {
	to {
		transform: rotate(360deg);
	}
}
</style>
