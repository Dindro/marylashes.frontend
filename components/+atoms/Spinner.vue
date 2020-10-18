<template>
	<svg class="spinner" width="48" height="48" viewBox="0 0 48 48">
		<circle class="spinner__ring" cx="24" cy="24" r="19" fill="none" stroke="currentColor" stroke-width="2"></circle>
		<circle class="spinner__half" cx="24" cy="24" r="19" fill="none" stroke="currentColor" stroke-width="2"></circle>
	</svg>
</template>

<style lang="scss">
.spinner {
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
}
</style>
