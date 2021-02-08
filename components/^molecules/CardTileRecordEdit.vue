<template>
	<CardTile
		title="Редактирование записи"
		class="tile-record-edit">

		<template #default>
			<div class="tile-record-edit__field">
				<FieldInput label="Имя"/>
			</div>

			<div class="tile-record-edit__field">
				<FieldInput label="Дата и время" />
			</div>

			<div class="tile-record-edit__field">
				<FieldInput label="Цена" v-model="price" prefix="₽"/>
				<p class="tile-record-edit__sublabel">Примерная стоимость ~1400 ₽</p>
			</div>

			<div class="tile-record-edit__field">
				<p class="tile-record-edit__title">Вид услуги</p>
			</div>
		</template>

		<template #footer>
			<LinkAction :link="{ tag: 'button', text: 'Сохранить' }"/>
		</template>
	</CardTile>
</template>

<script>
import CardTile from '^/CardTile';
import LinkAction from '+/LinkAction';
import FieldInput from '+/FieldInput';

export default {
	components: {
		CardTile,
		LinkAction,
		FieldInput,
	},

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

	data: () => ({
		price: '',
	}),
}
</script>

<style lang="scss">
.tile-record-edit {
	&__field {
		& + & {
			margin-top: rem(24);
		}
	}

	&__title {
		@include text-default;
		margin-bottom: rem(16);
	}

	&__sublabel {
		@include text-default;
		opacity: 0.3;
		margin-top: rem(4);
	}
}
</style>
