<template>
	<div class="list-filter">
		<div class="list-filter-item">
			<!-- От и до -->
		</div>

		<div class="list-filter-item" v-if="filter.status">
			<!-- Status -->
			<TabsHeaderSimple v-model="statusessSelected" :title="filter.status.title" :items="filter.status.items" multiple/>
		</div>
	</div>
</template>

<script>
import TabsHeaderSimple from '^/TabsHeaderSimple';

export default {
	components: {
		TabsHeaderSimple,
	},

	props: {
		filter: Object,
	},

	data: () => ({
		statusessSelected: [],
	}),
}
</script>

<style style="scss">
.list-filter {

}
</style>
