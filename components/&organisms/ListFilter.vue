<template>
	<div class="list-filter">
		<div class="list-filter-item">
			<FieldDateRange v-bind="records" v-model="recordsRange"/>
		</div>

		<div class="list-filter-item" v-if="filter.status">
			<TabsHeaderSimple
				v-model="statusessSelected"
				:title="filter.status.title"
				:items="filter.status.items"
				multiple/>
		</div>
	</div>
</template>

<script>
import TabsHeaderSimple from '^/TabsHeaderSimple';
import FieldDateRange from '+/FieldDateRange';

export default {
	components: {
		TabsHeaderSimple,
		FieldDateRange,
	},

	props: {
		filter: Object,
	},

	data: () => ({
		statusessSelected: [],
		recordsRange: {
			start: null,
			end: null,
		},

		records: {
			labelFrom: 'Записи с',
			labelTo: 'по',
			visibleReset: true,
		}
	}),
}
</script>

<style style="scss">
.list-filter {

}
</style>
