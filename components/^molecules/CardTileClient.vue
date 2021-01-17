<template>
	<CardTile
		title="Карта клиента"
		class="tile-client">
		<template #header>
			<Status :id="card.id"/>
		</template>

		<template #default>
			Контент
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
