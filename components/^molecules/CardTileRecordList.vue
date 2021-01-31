<template>
	<CardTile
		title="Статус текст"
		class="tile-record-list"
		theme="clear">
		<template #header>
			<slot name="header">
				<LinkAction :link="{ tag: 'button', text: 'Создать запись', icon: { name: '16/plus' }}"/>
			</slot>
		</template>

		<template #default>
			<CardRecordMini/>
			<CardRecordMini/>
			<CardRecordMini/>
		</template>

		<template #footer>
			<LinkAction :link="{ tag: 'button', text: 'Загрузить еще' }"/>
		</template>
	</CardTile>
</template>

<script>
import CardTile from '^/CardTile';
import LinkAction from '+/LinkAction';
import CardRecordMini from '^/CardRecordMini';

export default {
	components: {
		CardTile,
		LinkAction,
		CardRecordMini,
	},

	props: {
		card: {
			type: Object,
			default() {
				return {
					id: 'create',
					name: 'Ижуткина Мария',
					was: true,
					services: [],
					date: 'Помощь',
					socials: [

					]
				}
			}
		},
	}
}
</script>

<style lang="scss">
.tile-record-list {
	.card-tile__title {
		opacity: 0.3;
	}
}
</style>
