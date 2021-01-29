<template>
	<CardTile
		:theme="theme"
		:title="title"
		class="tile-client">
		<template #header v-if="header">
			<slot name="header">
				<LinkAction :link="{ tag: 'button', text: textHeaderAction }" @click.native="onClickHeaderAction"/>
			</slot>
		</template>

		<template #default>
			<div class="tile-client__user">
				Мария Ижуткина
			</div>

			<div class="tile-client__content">
				<TabsSimple>
					<div class="tile-client__info" title="Подробнее">
						<input type="text">
					</div>
					<div class="tile-client__static" title="Статистика" active>Статистика</div>
					<div class="tile-client__static" title="Записи">Записи</div>
				</TabsSimple>
			</div>
		</template>
	</CardTile>
</template>

<script>
import CardTile from '^/CardTile';
import LinkAction from '+/LinkAction';
import TabsSimple from '^/TabsSimple';

export default {
	components: {
		CardTile,
		LinkAction,
		TabsSimple,
	},

	props: {
		header: {
			type: Boolean,
			default: true,
		},
		title: {
			type: [Boolean, String],
			default: 'Карта клиента',
		},
		theme: String,
		card: {
			type: Object,
			default() {
				return {
					id: 'create',
				}
			}
		},
	},

	data: () => ({
		d: false,
	}),

	computed: {
		textHeaderAction() {
			return 'Редактировать';
		},
	},

	methods: {
		onClickHeaderAction() {
			this.d = true;
		},
	},
}
</script>

<style lang="scss">
.card-tile {

}
</style>
