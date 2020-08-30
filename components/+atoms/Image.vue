<template>
	<component :is="componentName" :image="image"></component>
</template>

<script>
import ImageTag from '+/ImageTag';
import ImageAdaptive from '+/ImageAdaptive';
import ImageRatio from '+/ImageRatio';

export default {
	components: {
		ImageTag,
		ImageAdaptive,
		ImageRatio
	},
	props: {
		image: {
			type: Object,
			required: true,
		}
	},

	computed: {
		componentName() {
			if (this.image.ratio) return 'image-ratio';
			if (this.image.tab || this.image.mob) return 'image-adaptive';
			return 'image-tag';
		},
	},
}
</script>
