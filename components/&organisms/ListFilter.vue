<template>
	<div class="list-filter">
		<div class="list-filter__item">
			<FieldDateRange v-bind="records" v-model="recordsRange"/>
		</div>

		<div class="list-filter__item" v-if="filter.status">
			<TabsHeaderSimple
				v-model="statusessSelected"
				:title="filter.status.title"
				:items="filter.status.items"
				multiple
				#default="{ item, onClick }">
				<Status :id="item.id">
					<LinkAction
						:link="{ ...item, tag: 'button', text: statuses[item.id].toLowerCase() }"
						@click.native="onClick"/>
				</Status>
			</TabsHeaderSimple>
		</div>
	</div>
</template>

<script>
import TabsHeaderSimple from '^/TabsHeaderSimple';
import FieldDateRange from '+/FieldDateRange';
import LinkAction from '+/LinkAction';
import Status from '+/Status';

import statuses from '@/utils/statuses';

export default {
	components: {
		TabsHeaderSimple,
		FieldDateRange,
		LinkAction,
		Status,
	},

	props: {
		filter: Object,
	},

	data: () => ({
		statuses,
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

<style lang="scss">
.list-filter {
	&__item {
		& + & {
			margin-top: rem(16);
		}
	}
}
</style>
