<template>
	<div class="photo-gallery">
		<div class="photo-gallery__header">
			<h2 class="photo-gallery__title">{{ photo_gallery.title }}</h2>
			<div class="photo-gallery__filter photo-gallery-filter">
				<button class="photo-gallery-filter__item"
					v-for="item in tabs"
					:key="item.id"
					:class="{ 'active': item.active, 'no-click': item.active && tabs.filter(x => x.active).length === 1 }"
					@click="selectTab(item)">{{ item.text }}</button>
			</div>
		</div>

		<gallery
			ref="gallery"
			:images="images"
			:index="selectedPhotoIndex"
			:button_text="photo_gallery.button_text"
			:button_text_mob="photo_gallery.button_text_mob"
			:effect_text="photo_gallery.effect_text"
			@close="selectedPhotoIndex = null"
			@end="more"
		></gallery>

		<transition-group name="photo-gallery-item" tag="div" class="photo-gallery__items">
			<div class="photo-gallery__item" v-for="(item, index) in itemsFiltered" :key="item.id" @click="openPhoto(index)">
				<image-vue
					v-cursor:label="{ label: images[index].view, sublabel: images[index].effect }"
					:image="Object.assign({}, item.image, { ratio: '1x1' })"
				></image-vue>
				<div class="photo-gallery__description" v-if="images[index]">
					<span class="photo-gallery__view">{{ images[index].view }}</span>
					<span class="photo-gallery__effect">{{ images[index].effect }}</span>
				</div>
			</div>
		</transition-group>

		<div class="photo-gallery__actions">
			<action @click.native="more" :action="photo_gallery.action"></action>
		</div>
	</div>
</template>

<script>
import ImageVue from '+/Image';
import Gallery from '&/Gallery';

const ALL = 'ALL';

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

	data: (ctx) => {
		return {
			items: ctx.photo_gallery.items,
			selectedPhotoIndex: null,
			selectedTabs: [ALL],
		}
	},

	computed: {
		itemsFiltered() {
			return this.items.filter((item) => {
				const { view_id } = item;
				if (this.selectedTabs.indexOf(ALL) !== -1) return true;

				if (this.selectedTabs.indexOf(view_id) !== -1) return true;

				return false
			});
		},

		images() {
			return this.itemsFiltered.map((item) => ({
				href: item.image.src,
				view: this.photo_gallery.views[item.view_id],
				effect: this.photo_gallery.effects[item.effect_id],
			}));
		},

		tabs() {
			return Object.keys(this.photo_gallery.views).map((item) => {
				return {
					active: this.selectedTabs.indexOf(item) !== -1,
					id: item,
					text: this.photo_gallery.views[item],
				}
			});
		}
	},

	methods: {
		openPhoto(index) {
			this.selectedPhotoIndex = index;
		},

		selectTab({ id }) {
			const index = this.selectedTabs.indexOf(id);
			const exist = index !== -1;

			// Оставляем один активный элемент которого нельзя удалить
			if (exist) {
				if (this.selectedTabs.length === 1) return;

				this.selectedTabs.splice(index, 1)

			} else {
				// Если выбран ВСЕ
				if (id === ALL) {
					// Деактивирем остальные элементы
					this.selectedTabs.length = 0;
				} else {
					// Деактивируем ВСЕ
					const indexAll = this.selectedTabs.indexOf(ALL);
					indexAll !== -1 && this.selectedTabs.splice(indexAll, 1);

					// Если пункты все заполнены, то это значит выбран ВСЕ
					const { length } = Object.keys(this.photo_gallery.views);
					if (length === this.selectedTabs.length + 2) {
						this.selectedTabs.length = 0;
						id = ALL;
					}
				}

				this.selectedTabs.push(id);
			}
		},

		more() {
			// Получаем id эффектов
			const activesIds = this.selectedTabs;

			this.$provide.photo.get().then((res) => {
				this.items.push(...res.data);
				this.selectedPhotoIndex !== null && this.$refs.gallery.add();
			});
			// Отправляем на сервер
			// Ожидаем
			// Добавляем
		}
	},

	mounted() {

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

	&__actions {
		margin-top: rem(64);
		text-align: center;
	}
}

.photo-gallery-item {
	&-move {
		transition: transform 1s;
	}
}

.photo-gallery-filter {
	display: flex;
	margin: 0 rem(-12);

	&__item {
		border: none;
		border-radius: 0;
		padding: 0;
		background-color: transparent;
		padding: rem(12);
		opacity: 0.3;
		outline: none !important;
		@include defaultTransition(opacity);

		&.active,
		&:hover {
			opacity: 1;
		}

		&.no-click {
			pointer-events: none;
		}
	}
}
</style>
