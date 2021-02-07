<template>
	<div class="work-records">
		<div class="work-records__event">
			<CardTileRecord/>
			<CardTileReport/>
			<CardTileReportCancel/>
		</div>

		<div class="work-records__user">
			<CardTileClient/>
			<CardTileClients/>
			<CardTileCreate/>
		</div>
	</div>
</template>

<script>
import CardTileRecord from '^/CardTileRecord';
import CardTileClient from '^/CardTileClient';
import CardTileClients from '^/CardTileClients';
import CardTileCreate from '^/CardTileCreate';
import CardTileReport from '^/CardTileReport';
import CardTileReportCancel from '^/CardTileReportCancel';

export default {
	components: {
		CardTileRecord,
		CardTileClient,
		CardTileClients,
		CardTileCreate,
		CardTileReportCancel,
		CardTileReport,
	},

	props: {
		value: {
			type: Number,
		},
	},

	data: () => ({
		record: null,
	}),

	methods: {
		onChangeValue(value) {
			if (!value) return;

			this.getData(value);
		},

		getData(value) {
			// Получить record
			// Получить пользователя
		},
	},

	watch: {
		value: {
			handler: 'onChangeValue',
			immediate: true,
		}
	},
}
</script>

<style lang="scss">
.work-records {
	display: flex;
	margin-left: rem(-24);
	margin-right: rem(-24);

	> * {
		padding-left: rem(24);
		padding-right: rem(24);
	}

	&__event {
		width: calc(100% / 9 * 4);
	}

	&__user {
		width: calc(100% / 9 * 5);
	}
}
</style>
