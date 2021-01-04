<template>
	<ul class="paginate">
		<li v-for="(item, i) in items" :key="i">
			<LinkAction :link="item" />
		</li>
	</ul>
</template>

<script>
import LinkAction from '+/LinkAction';

export default {
	components: {
		LinkAction,
	},

	props: {
		paginate: Array,
	},

	computed: {
		items() {

		}
	}
}
</script>

<style lang="scss">
.paginate {

}
</style>
