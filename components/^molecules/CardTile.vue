<template>
	<div class="card-tile" :class="theme && `card-tile--${theme}`">
		<div v-if="title || $slots.header" class="card-tile__header">
			<span v-if="title" class="card-tile__title">{{ title }}</span>
			<div v-if="$slots.header" class="card-tile__header-slot">
				<slot name="header"></slot>
			</div>
		</div>
		<div class="card-tile__box">
			<slot></slot>
		</div>
		<div v-if="$slots.footer" class="card-tile__footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: [String, Boolean],
		theme: {
			type: String,
			default: 'default',
			validator: value => ['border', 'default'].indexOf(value) !== -1,
		}
	},
}
</script>

<style lang="scss">
.card-tile {
	$b: #{&};

	& + & {
		margin-top: rem(48);
	}

	&__header {
		display: flex;
		align-items: flex-end;
		margin-bottom: rem(16);

		& > * + * {
			margin-left: rem(32);
		}
	}

	&__header-slot {
		flex: 1 1 auto;
		text-align: right
	}

	&__title {
		@include text-default;
	}

	&__box {
		background-color: $color-light;
		border-radius: rem(2);
		padding: rem(32);
	}

	&__footer {
		margin-top: rem(16);
		text-align: right
	}

	&--border {
		& + & {
			margin-top: rem(16);
		}

		#{$b}__box {
			padding: rem(16);
			border: 1px solid rgba($color-dark, 0.3);
		}
	}
}
</style>
