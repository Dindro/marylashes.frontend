<template>
	<div class="info-panel">
		<p class="info-panel__date info-panel__item">{{ info.date }}</p>
		<p class="info-panel__view info-panel__item">
			<span>{{ info.view }}</span>
		</p>
		<ul v-if="info.tags" class="info-panel-tag info-panel__item">
			<li v-for="(item, index) in info.tags" :key="index">
				<tag-link class="info-panel-tag__item" :link="item">{{ item.text }}</tag-link>
			</li>
		</ul>
	</div>
</template>

<script>
import TagLink from '+/TagLink';

export default {
	components: {
		TagLink,
	},
	props: {
		info: {
			date: Date,
			view: Number,
			tags: Array,
		}
	}
}
</script>

<style lang="scss">
.info-panel {

}
</style>
