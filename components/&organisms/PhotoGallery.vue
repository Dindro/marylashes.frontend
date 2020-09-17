<template>
	<div class="photo-gallery">
		<div class="photo-gallery__header">
			<h2 class="photo-gallery__title">{{ photo_gallery.title }}</h2>
			<div class="photo-gallery__filter"></div>
		</div>
		<client-only>

		</client-only>
		<div class="photo-gallery__items">
			<div class="photo-gallery__item" v-for="(item, index) in photo_gallery.items" :key="index" @click="openPhoto(index)">
				<image-vue :image="Object.assign({}, item.image, { ratio: '1x1' })"></image-vue>
			</div>
		</div>
	</div>
</template>

<script>
import ImageVue from '+/Image';

export default {
	components: {
		ImageVue
	},

	props: {
		photo_gallery: {
			type: Object,
			required: true,
		}
	},

	data: () => ({
        selectedPhotoIndex: null
	}),

	computed: {
		images() {
			return this.photo_gallery.items.map((item) => item.image.src);
		},
	},

	methods: {
		openPhoto(index) {
			this.selectedPhotoIndex = index;
		}
	}
}
</script>

<style lang="scss">
.photo-gallery {

	&__title {
		@include h2;
	}

	&__header {
		margin-bottom: rem(64);
	}

	&__items {
		display: flex;
		flex-wrap: wrap;
		margin: rem(-32);
	}

	&__item {
		width: 33.333%;
		padding: rem(32);
	}
}
</style>
