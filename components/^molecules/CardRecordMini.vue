<template>
	<div class="card-record-mini">
		<div class="card-record-mini__header">
			<p class="card-record-mini__date text-default">
				<span>20 января</span>
				<span class="card-record-mini__time">13:20</span>
			</p>

			<p class="card-record-mini__info text-default">
				<span class="card-record-mini__price">1400 ₽</span>
				<span class="card-record-mini__services">Классика - Снятие</span>
			</p>
		</div>

		<div class="card-record-mini__content">
			<p class="card-record-mini__comment text-default">Все супер но пришлось сделать кое один момент очень неверный. Например 2d вообще не подошло блин.</p>

			<div class="card-record-mini-photos">
				<div class="card-record-mini-photos__item">
					<Box ratio="1x1">
						<div>ddd</div>
					</Box>
				</div>
				<div class="card-record-mini-photos__item">
					<Box ratio="1x1">
						<div>ddd</div>
					</Box>
				</div>
			</div>
		</div>

		<div class="card-record-mini__actions">
			еще
		</div>
	</div>
</template>

<script>
import Box from '+/Box';

export default {
	components: {
		Box,
	},
}
</script>

<style lang="scss">
.card-record-mini {
	$b: #{&};

	padding: rem(16);
	border: 1px solid rgba($color-dark, 0.15);
	border-radius: rem(2);

	& + & {
		margin-top: rem(8);
	}

	&__header {
		display: flex;
		justify-content: space-between;
	}

	&__time,
	&__price {
		opacity: 0.3;
	}

	&__price {
		margin-right: 0.5em;
	}

	&__content {
		margin-top: rem(16);
	}

	&__info {
		text-align: right;
	}

	&__actions {
		text-align: right;
		margin-top: rem(8);

		#{$b}__header + & {
			margin-top: rem(4);
		}
	}
}

.card-record-mini-photos {
	margin: 0 0 0 rem(-8);
	display: flex;
	flex-wrap: wrap;

	&__item {
		width: rem(64);
		margin: rem(8) 0 0 rem(8);
	}
}
</style>
