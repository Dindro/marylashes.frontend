<template>
	<picture>
		<template v-for="(item, index) of [ image.tab, image.mob ]">
			<source
				v-if="item"
				:media="medias[item]"
				:srcset="getSrcset(item.srcset)"
				:key="index"
			/>
		</template>
		<image-tag :image="image"></image-tag>
	</picture>
</template>

<script>
import ImageTag from '+/ImageTag';
import image from '@/utils/mixins/image';
import { devices } from '@/utils/breakpoints';

export default {
	components: {
		ImageTag,
	},
	mixins: [image],
	props: {
		image: {
			type: Object,
			required: true,
		}
	},

	data: (context) => ({
		medias: {
			[context.image.mob]: `(max-width: ${devices.md - 1 }px)`,
			[context.image.tab]: `(max-width: ${devices.lg - 1 }px)`,
		},
	}),
}
</script>
