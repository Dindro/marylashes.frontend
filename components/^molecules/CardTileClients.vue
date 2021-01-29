<template>
	<CardTile
		title="Возможный клиент из базы"
		class="tile-clients">
		<template #default>
			<CardTileClient
				v-for="item in card.items" :key="item.id"
				:card="item"
				:title="false"
				:header="false"
				theme="border">

			</CardTileClient>
		</template>
	</CardTile>
</template>

<script>
import CardTile from '^/CardTile';
import CardTileClient from '^/CardTileClient';

export default {
	components: {
		CardTile,
		CardTileClient,
	},

	props: {
		card: {
			type: Object,
			default() {
				return {
					items: [
						{
							id: 2,
						},
						{
							id: 4,
						}
					]
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
