<template>
	<CardTile
		title="Информация о записи"
		class="tile-record">
		<template #header>
			<Status :id="card.statusId"/>
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
				<p class="tile-record-row__title">Цена</p>
				<p class="tile-record-row__content">1600 ₽</p>
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

			<div class="tile-record-row">
				<p class="tile-record-row__title">Комментарии отчета</p>
				<p class="tile-record-row__content">Все супер, но не понравилось клиенту так как лисий эффект. В следующий раз сделать беличий</p>
			</div>

			<div class="tile-record-row">
				<p class="tile-record-row__title">Фото отчета</p>
				<p class="tile-record-row__content">
					Фотки
				</p>
			</div>

			<div class="tile-record-row">
				<p class="tile-record-row__title">Инициатор отмены</p>
				<p class="tile-record-row__content">
					Клиент
				</p>
			</div>

			<div class="tile-record-row">
				<p class="tile-record-row__title">Причина отмены</p>
				<p class="tile-record-row__content">
					Клиента решила отменить
				</p>
			</div>
		</template>

		<template #footer>
			<Dropdown text="еще" :items="dropdownItems"/>
		</template>
	</CardTile>
</template>

<script>
import CardTile from '^/CardTile';
import Status from '+/Status';
import Dropdown from '^/Dropdown';
import recordActions from '~/utils/mixins/record-actions';

export default {
	components: {
		CardTile,
		Status,
		Dropdown,
	},

	mixins: [
		recordActions,
	],

	props: {
		card: {
			type: Object,
			default() {
				return {
					id: 40,
					statusId: 'create',
					clientId: null,
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
