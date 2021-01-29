<template>
	<div class="container mb-64">
		<Hero :hero="hero" class="mb-48">
			<div class="hero-inner">
				<div class="hero-inner__action">
					<LinkAction :link="hero.action"/>
				</div>
				<div v-if="hero.views" class="hero-inner__view">
					<TabsHeaderSimple :title="hero.views.title" :items="hero.views.items" v-model="viewSelected"/>
				</div>
			</div>
		</Hero>

		<!-- List view -->
		<template v-if="viewSelected === 0">
			<ListControl
				ref="list"
				:list="list"
				:listViewComponent="listViewComponent"
				@select="onSelectRecord">

			</ListControl>

			<Drawer v-model="showDrawer">
				<CardTileRecord/>
				<CardTileClient/>
			</Drawer>
		</template>

		<!-- Calendar view -->
		<template v-else-if="viewSelected === 1">
			<WorkCalendar v-model="recordSelected"/>
			<WorkRecords class="mt-64" :value="recordSelected"/>
		</template>
	</div>
</template>

<script>
import Hero from '&/Hero';
import LinkAction from '+/LinkAction';
import TabsHeaderSimple from '^/TabsHeaderSimple';
import ListControl from '&/ListControl';
import ListRecords from '&/ListRecords';
import Drawer from '&/Drawer';
import CardTileRecord from '^/CardTileRecord';
import CardTileClient from '^/CardTileClient';
import WorkCalendar from '&/WorkCalendar';
import WorkRecords from '&/WorkRecords';

export default {
	layout: 'navbar',

	components: {
		Hero,
		LinkAction,
		ListControl,
		Drawer,
		CardTileRecord,
		CardTileClient,
		WorkCalendar,
		WorkRecords,
	},

	asyncData(ctx) {
		return ctx.app.$axios.get('/api/v1/auth-records').then((res) => {
			return res.data;
		});
  	},

	data: () => ({
		viewSelected: 1,
		recordSelected: null,
		showDrawer: false,
		// Компонент таблица
		listViewComponent: ListRecords,
	}),

	methods: {
		onSelectRecord(record) {
			process.env.NODE_ENV === 'development' && console.log('Select record', record);

			let showDrawer;

			if (!record) {
				showDrawer = false;
			} else {
				// Получаем детальную запись

				// Получаем детальную карточку клиентку

				showDrawer = true;
			}

			this.showDrawer = showDrawer;
		},
	},

	watch: {
		showDrawer(value) {
			// Скрываем выбранный запись
			if (!value) {
				this.$refs.list.listSelected = null;
			}
		}
	}
}
</script>

<style lang="scss">
.hero-inner {
	display: flex;

	> * + * {
		margin-left: rem(40);
	}

	&__view {
		display: flex;
	}

	&__view-title {
		@include text-default;
		margin-right: rem(16);
		opacity: 0.3;
	}
}
</style>
