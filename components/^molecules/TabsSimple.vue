<template>
	<div class="tabs-simple">
		<div class="tabs-simple__header">
			<p class="tabs-simple__title">{{ tabs.title }}</p>
			<TabsHeaderSimple :value="value" :items="tabs"></TabsHeaderSimple>
		</div>
		<div class="tabs-simple__body">
			<!-- Список body -->
			<slot></slot>
		</div>
	</div>
</template>

<script>
import TabsHeaderSimple from '^/TabsHeaderSimple';

export default {
	props: {
		tabs: Object,
	},

	data: {
		value: '',
	},

	created(ctx) {

	}
}
</script>

<style>

</style>
