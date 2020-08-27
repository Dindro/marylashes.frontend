<template>
	<div class="info-panel">
		<p class="info-panel__date info-panel__item">{{ info.date }}</p>
		<p class="info-panel__view info-panel__item">
			<icon :icon="{ name: '16/eye' }"></icon>
			<span>{{ info.view }}</span>
		</p>
		<ul v-if="info.tags" class="info-panel-tag">
			<li v-for="(item, index) in info.tags" :key="index">
				<tag-link class="info-panel-tag__item" :link="item">{{ item.text }}</tag-link>
			</li>
		</ul>
	</div>
</template>

<script>
import TagLink from '+/TagLink';
import Icon from '+/Icon';

export default {
	components: {
		TagLink,
		Icon,
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
	display: flex;
	align-items: center;
	@include text-small;

	&__item {
		opacity: 0.3;

		&:not(:last-child) {
			margin-right: rem(8);
		}
	}
}
</style>
