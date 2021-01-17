<template>
	<div class="drawer" :class="{ 'is-open': value }">
		<div class="drawer__content" :class="contentClass">
			<div class="drawer__close">
				<LinkAction :link="closeAction" @click.native="close"/>
			</div>

			<slot></slot>
		</div>
	</div>
</template>

<script>
import LinkAction from '+/LinkAction';

export default {
	components: {
		LinkAction,
	},

	props: {
		value: Boolean,
		contentClass: {
			type: String,
		}
	},

	data: () => ({
		closeAction: {
			tag: 'button',
			text: 'Закрыть'
		}
	}),

	methods: {
		close() {
			this.$emit('input', false);
		}
	}
}
</script>

<style lang="scss">
.drawer {
	$b: #{&};

	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	pointer-events: none;
	z-index: $z-index-drawer;

	&.is-open {
		#{$b}__content {
			transform: none;
			pointer-events: all;
		}
	}

	&__content {
		border-left: 1px solid rgba($color-dark, 0.3);
		padding-right: rem($wrapper-gutter-lg-1);
		padding-top: rem(48);
		padding-left: rem(48);
		padding-bottom: rem(48);
		height: 100%;
		width: rem(592);
		background-color: rgba($color-white, 0.8);
		pointer-events: none;
		overflow-y: auto;
		transform: translateX(100%);

		@include defaultTransition(transform);

		@include media-container-up {
			width: calc(50vw - #{rem($grid-max-width / 2 - 592)});
			padding-right: calc(50vw - #{rem($grid-max-width / 2 - 120)});
		}
	}

	&__close {
		display: flex;
		justify-content: flex-end;
		margin-bottom: rem(48);
	}
}
</style>
