<template>
	<VDropdown
		class="dropdown"
		:offset="offset"
		:placement="placement">
		<slot>
			<LinkAction :link="Object.assign({}, { tag: 'button', text: text })"/>
		</slot>

		<template #popper>
			<div class="dropdown__content">
				<slot name="content" :items="items">
					<LinkAction
						v-close-popper
						v-for="(item, index) in items"
						:key="index"
						@click.native="item.handler ? item.handler : null"
						:link="Object.assign({}, { tag: 'button' }, item)"/>
				</slot>
			</div>
		</template>
	</VDropdown>
</template>

<script>
import { Dropdown as VDropdown, VClosePopper as ClosePopper } from 'v-tooltip';
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
		VDropdown,
		LinkAction,
	},

	directives: {
		ClosePopper,
	},

	props: {
		text: String,
		items: Array,

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
.dropdown {
	&__content {
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		> * + * {
			margin-top: rem(4);
		}
	}
}

.v-popper {
	$b: #{&};

	&__popper {
		z-index: $z-index-dropdown;
		outline: none !important;

		&--hidden {
			visibility: hidden;
			opacity: 0;
			@include defaultTransition(opacity, visibility);
			transition-duration: $timing / 2;
		}

		&--shown {
			visibility: visible;
			opacity: 1;
			@include defaultTransition(opacity);
			transition-duration: $timing / 2;
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
