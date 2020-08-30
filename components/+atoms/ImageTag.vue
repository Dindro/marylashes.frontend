<template>
	<img class="image" :src="image.src" v-bind="{ srcset, alt }" />
</template>

<script>
import image from '@/utils/mixins/image';

export default {
	mixins: [image],
	props: {
		image: {
			type: Object,
			required: true,
		}
	}
}
</script>

<style lang="scss">
.image {
	object-fit: cover;
	object-position: center;
	max-width: 100%;
}
</style>
