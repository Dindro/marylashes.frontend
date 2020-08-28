<template>
	<tag-link :link="link" class="link-action">
		<span class="link-action__text">{{ link.text }}</span>
		<i class="link-action__icon" v-if="link.icon"></i>
	</tag-link>
</template>

<script>
import TagLink from "./TagLink";

export default {
	components: {
		TagLink,
	},

	props: {
		link: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="scss">
</style>
