<template>
	<div class="card-tile">
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
		title: String,
	},
}
</script>

<style lang="scss">
.card-tile {
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
	}
}
</style>
