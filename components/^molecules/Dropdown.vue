<template>
	<VDropdown
		:offset="offset"
		:placement="placement">
		<slot>
			<span>ещё</span>
		</slot>

		<template #popper>
			<div>dfwefw</div>
		</template>
	</VDropdown>
</template>

<script>
import { Dropdown as VDropdown } from 'v-tooltip';
import LinkAction from '+/LinkAction';
import { convertToScalingPx } from '~/utils/convert';

const getDefaultConfig = () => {
	let offset = process.client ? [convertToScalingPx(16), convertToScalingPx(8)] : [8, 8];

	return {
		offset,
	};
}

export default {
	components: {
		VDropdown
	},

	props: {
		placement: {
			type: String,
			default: 'bottom-end',
		},

		offset: {
			type: Array,
			default() {
				return getDefaultConfig().offset;
			},
		}
	},
}
</script>

<style lang="scss">
.v-popper {
	$b: #{&};

	&__popper {
		z-index: $z-index-dropdown;
		outline: none !important;

		&--hidden {
			visibility: hidden;
			opacity: 0;
			@include defaultTransition(opacity, visibility);
		}

		&--shown {
			visibility: visible;
			opacity: 1;
			@include defaultTransition(opacity);
		}

		&--skip-transition,
		&--skip-transition > &__wrapper {
			transition: none !important;
		}

		.resize-observer {
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			width: 100%;
			height: 100%;
			border: none;
			background-color: transparent;
			pointer-events: none;
			display: block;
			overflow: hidden;
			opacity: 0;

			object {
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				overflow: hidden;
				pointer-events: none;
				z-index: -1;
			}
		}
	}

	&__inner {
		position: relative;
		background: $color-light;
		border: 1px solid rgba($color-dark, 0.15);
		border-radius: rem(2);
		padding: rem(16);
		box-shadow: 0px rem(2) rem(6) rem(2) rgba($color-dark, 0.05);
	}

	&--theme-dropdown {
		#{$b}__inner {
			min-width: rem(120);
		}
	}
}
</style>
