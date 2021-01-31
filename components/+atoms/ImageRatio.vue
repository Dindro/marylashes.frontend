<template>
	<Box :ratio="image.ratio">
		<component :is="componentName" class="image-ratio__img" :image="image"></component>
	</Box>
</template>

<script>
import ImageTag from '+/ImageTag';
import ImageAdaptive from '+/ImageAdaptive';
import Box from '+/Box';

export default {
	components: {
		ImageTag,
		ImageAdaptive,
		Box,
	},

	props: {
		image: {
			type: Object,
			required: true,
		},
	},

	computed: {
		componentName() {
			return this.image.tab || this.image.mob ? 'image-adaptive' : 'image-tag';
		}
	}
}
</script>
