<template>
	<CardTile
		title="Информация о записи"
		class="tile-record">
		<template #header>
			<Status :id="card.id"/>
		</template>

		<template #default>
			<div class="tile-record-row">
				<p class="tile-record-row__content">
					Ижуткина Мария
					<span>(была раннее)</span>
				</p>
			</div>

			<div class="tile-record-row">
				<p class="tile-record-row__title">Услуги</p>
				<p class="tile-record-row__content">Классика и снятие</p>
			</div>

			<div class="tile-record-row">
				<p class="tile-record-row__title">Дата и время</p>
				<p class="tile-record-row__content">13.10.2020 15:00</p>
			</div>

			<div class="tile-record-row">
				<p class="tile-record-row__title">Социальные сети</p>
				<table class="tile-record-row__content">
					<tbody>
						<tr>
							<th>Vk</th>
							<td>i7enov</td>
						</tr>

						<tr>
							<th>In</th>
							<td>i7enov</td>
						</tr>
					</tbody>
				</table>
			</div>
		</template>

		<template #footer>
			Футер
		</template>
	</CardTile>
</template>

<script>
import CardTile from '^/CardTile';
import Status from '+/Status';

export default {
	components: {
		CardTile,
		Status,
	},

	props: {
		card: {
			type: Object,
			default() {
				return {
					id: 'create',
					name: 'Ижуткина Мария',
					was: true,
					services: [0, 2, 4],
					date: 'Помощь',
					socials: [

					]
				}
			}
		},
	},
}
</script>

<style lang="scss">
.tile-record {

}

.tile-record-row {
	$b: #{&};

	@include text-default;

	& + & {
		margin-top: rem(16);
	}

	&__title {
		opacity: 0.3;
	}

	table#{$b}__content {
		@include text-default;

		th,
		td {
			padding: 0;
		}

		td {
			padding: 0 rem(16);

			&:last-child {
				padding-right: 0;
			}
		}

		th {
			opacity: 0.3;
		}
	}
}
</style>
