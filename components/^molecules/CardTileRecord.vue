<template>
	<CardTile
		title="Информация о записи"
		class="tile-record">
		<template #header>
			<Status :id="card.id"/>
		</template>

		<template #default>
			Контент
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
				}
			}
		},
	}
}
</script>

<style lang="scss">
.card-tile {

}
</style>
