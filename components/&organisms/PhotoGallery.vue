<template>
	<div class="photo-gallery">
		<div class="photo-gallery__header">
			<h2 class="photo-gallery__title">{{ photo_gallery.title }}</h2>
			<div class="photo-gallery__filter"></div>
		</div>

		<gallery
			:images="images"
			:index="selectedPhotoIndex"
			@close="selectedPhotoIndex = null"
			:button_text="photo_gallery.button_text"
			:button_text_mob="photo_gallery.button_text_mob"
			:effect_text="photo_gallery.effect_text"
		></gallery>

		<div class="photo-gallery__items">
			<div class="photo-gallery__item" v-for="(item, index) in photo_gallery.items" :key="index" @click="openPhoto(index)">
				<image-vue
					v-cursor:label="{ label: images[index].view, sublabel: images[index].effect }"
					:image="Object.assign({}, item.image, { ratio: '1x1' })"
				></image-vue>
				<div class="photo-gallery__description" v-if="images[index]">
					<span class="photo-gallery__view">{{ images[index].view }}</span>
					<span class="photo-gallery__effect">{{ images[index].effect }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ImageVue from '+/Image';
import Gallery from '&/Gallery';

export default {
	components: {
		ImageVue,
		Gallery,
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
			return this.photo_gallery.items.map((item) => ({
				href: item.image.src,
				view: this.photo_gallery.views[item.view_id],
				effect: this.photo_gallery.effects[item.effect_id],
			}));
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
		display: flex;
		justify-content: space-between;
	}

	&__items {
		display: flex;
		flex-wrap: wrap;
		margin: rem(-32);

		@include media-breakpoint-down(sm) {
			margin: 0 rem(-$wrapper-gutter-sm-1);
		}
	}

	&__item {
		width: 33.333%;
		padding: rem(32);

		@include media-breakpoint-down(md) {
			width: 50%;
		}

		@include media-breakpoint-down(sm) {
			width: 100%;
			padding: 0;

			& + & {
				margin-top: rem(40);
			}
		}
	}

	&__description {
		position: absolute;
		margin-top: rem(4);
		color: $color-dark;

		@include media-breakpoint-down(sm) {
			position: static;
			padding: 0 rem($wrapper-gutter-sm-1);
		}
	}

	&__view {
		@include text-default;
		opacity: 0.65;
		text-transform: lowercase;
	}

	&__effect {
		@include text-small;
		opacity: 0.3;
	}
}
</style>
