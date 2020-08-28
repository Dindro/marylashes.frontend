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

</style>
