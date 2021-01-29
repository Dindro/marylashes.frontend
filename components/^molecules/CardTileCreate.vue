<template>
	<CardTile
		title="Не нашли клиента из базы?"
		class="tile-create">
		<template #default>
			<div class="tile-create__link">
				<LinkAction :link="{ tag: 'button', text: 'Добавить клиента в базу' }"/>
			</div>
			<div class="tile-create__link">
				<LinkAction :link="{ tag: 'button', text: 'Привязать к существующей' }"/>
			</div>
		</template>
	</CardTile>
</template>

<script>
import CardTile from '^/CardTile';
import LinkAction from '+/LinkAction';

export default {
	components: {
		CardTile,
		LinkAction,
	},

	props: {

	},
}
</script>

<style lang="scss">
.tile-create {
	&__link {
		& + & {
			margin-top: rem(8);
		}
	}
}
</style>
