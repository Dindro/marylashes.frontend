<template>
	<div class="photo-gallery" sticky-container>

		<!-- Heading && Filter -->
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

		<!-- Gallery -->
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

		<!-- Photos -->
		<transition-group name="photo-gallery-item" tag="div" ref="photosParent" class="photo-gallery__items" @before-leave="onBeforeLeavePhoto">
			<div
				class="photo-gallery__item"
				v-for="(item, index) in itemsFiltered"
				:key="item.id"
				@click="openPhoto(index)"
				ref="photo">
				<image-vue
					:image="Object.assign({}, item.image, { ratio: '1x1' })"
				></image-vue>
				<div class="photo-gallery__description" v-if="images[index]">
					<span class="photo-gallery__view">{{ images[index].view }}</span>
					<span class="photo-gallery__effect">{{ images[index].effect }}</span>
				</div>
			</div>
		</transition-group>

		<!-- More -->
		<div class="photo-gallery__actions">
			<span class="photo-gallery__loaded" v-if="selectedLoaded">{{ photo_gallery.loaded }}</span>
			<action v-else @click.native="more" :action="Object.assign({}, photo_gallery.action, { loading: isLoading })"></action>
		</div>

		<!-- Info -->
		<div class="photo-gallery__info">
			<div class="photo-gallery-info"
				v-sticky sticky-side="bottom"
				stick-align="right"
				:sticky-offset="stickyOffset"
			>
				<span class="photo-gallery-info__title">FILTER</span>
				<span class="photo-gallery-info__item" v-for="(item, index) in selectedTabs" :key="index">
					{{ photo_gallery.views[item] }}
				</span>
				<button
					class="photo-gallery-info__clear"
					v-if="selectedTabs.indexOf(ALL) === -1"
					@click="selectTab({ id: ALL })"
				>
					<icon-vue :icon="{ name: '24/cross', size: 16 }"></icon-vue>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import ImageVue from '+/Image';
import IconVue from '+/Icon';
import Gallery from '&/Gallery';

import { getForBreakpoints } from '@/utils/breakpoints';
import { convertToScalingPx } from '@/utils/convert';

let VueStickyDirective;
if (process.client) {
	VueStickyDirective = require('@pauleliet/vue-sticky-directive').default;
}

const ALL = 'ALL';

export default {
	components: {
		ImageVue,
		IconVue,
		Gallery,
	},

	props: {
		photo_gallery: {
			type: Object,
			required: true,
		}
	},

	directives: {
		sticky: VueStickyDirective,
	},

	data: (ctx) => {

		// Вычесляем отступы для стики
		let stickyOffset;
		if (process.client) {
			stickyOffset = ctx.getStickyOffset();
		}

		return {
			items: ctx.photo_gallery.items,								// Список фото
			selectedPhotoIndex: null,									// Индекс выбранного фото
			selectedTabs: [ALL],										// Выбранные категории фото
			itemsLoaded: ctx.photo_gallery.items_loaded ? [ALL] : [],	// Загруженные категории фото
			isLoading: false,											// Статус загрузки фото
			stickyOffset,												// Значение отступов для стики
			ALL,														// Значение id - "ВСЕ"
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
		},

		selectedLoaded() {
			if (this.itemsLoaded.indexOf(ALL) !== -1) return true;

			// Тут точно нет ALL

			return this.selectedTabs.every((id) => {
				return this.itemsLoaded.indexOf(id) !== -1;
			});
		}
	},

	methods: {
		openPhoto(index) {
			this.selectedPhotoIndex = index;
		},

		calculatePhotoPosition() {
			for (const photo of this.$refs.photo) {
				const { offsetLeft, offsetTop } = photo;
				photo.style.left = offsetLeft + 'px';
				photo.style.top = offsetTop + 'px';
			}
		},

		onBeforeLeavePhoto(el) {
			el.style.position = 'absolute';
			el.style.transition = 'opacity .5s';
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
			// Если загружается то ничего не делаем
			if (this.isLoading) return;

			// Если выбранные категории загружены полностью и нет на сервере
			if (this.selectedLoaded) return;

			// Получаем id эффектов, клонируя
			const ids = [...this.selectedTabs];

			// Включаем loading
			this.isLoading = true;

			this.$provide.photo.get(ids).then((res) => {
				const items = res.data;

				// В случае если фото больше нет
				// то добавляем в список загруженных
				if (!items || !items.length) {
					ids.forEach((id) => {
						this.itemsLoaded.indexOf(id) === -1 && this.itemsLoaded.push(id);
					});

					// Если все пункты загружены то значит это ALL
					if (this.itemsLoaded.length === this.photo_gallery.views.length - 1) {
						this.itemsLoaded.length = 0;
						this.itemsLoaded.push(ALL);
					}
				}

				this.items.push(...items);
				this.selectedPhotoIndex !== null && this.$refs.gallery.add();

			}).catch((err) => {
				// TODO: Добавить ошибку в стек ошибок

			}).finally(() => {
				this.isLoading = false;
			});
		},

		getStickyOffset() {
			const lg = {
				bottom: convertToScalingPx(40),
				top: convertToScalingPx(180),
			};

			const md = {
				bottom: convertToScalingPx(20),
				top: convertToScalingPx(144),
			};

			const sm = {
				bottom: convertToScalingPx(12),
				top: convertToScalingPx(240)
			}

			return JSON.stringify(getForBreakpoints(lg, md, sm));
		}
	},

	watch: {
		isLoading(value) {
			this.$refs.gallery.nav_arrows.nextLoading = value;
		},

		itemsFiltered(value, valueOld) {
			if (value.length < valueOld.length) {
				// Если фото уменьшилось пересчитываем top left и проставляем для анимации
				// так как будет это все абсолютом
				this.calculatePhotoPosition();
			}
		}
	}
}
</script>

<style lang="scss">
.photo-gallery {
	position: relative;

	&__title {
		@include h2;

		@include media-breakpoint-down(sm) {
			margin-bottom: rem(16);
		}
	}

	&__header {
		margin-bottom: rem(64);
		display: flex;
		justify-content: space-between;

		@include media-breakpoint-down(sm) {
			display: block;
			margin-bottom: rem(32);
		}
	}

	&__items {
		display: flex;
		flex-wrap: wrap;
		margin: rem(-32);
		position: relative;

		@include media-breakpoint-down(sm) {
			margin: 0 rem(-$wrapper-gutter-sm-1);
		}
	}

	&__item {
		width: 33.333%;
		padding: rem(32);
		z-index: 1;
		cursor: pointer;

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

		@include media-breakpoint-down(sm) {
			margin-top: rem(32);
		}
	}

	&__loaded {
		@include text-small;
		opacity: 0.65;
	}

	&__info {
		position: absolute;
		right: rem(-80);
		bottom: rem(-24);
		height: rem(80); // иначе Sticky не понимает

		@include media-breakpoint-down(md) {
			right: rem(-$wrapper-gutter-md-1 / 2);
		}

		@include media-breakpoint-down(sm) {
			bottom: rem(96);
			right: rem(-$wrapper-gutter-sm-1 / 2);
			height: rem(64);
		}
	}
}

.photo-gallery-item {
	&-enter {
		opacity: 0;

		&-active {
			transition: opacity 1s;
		}
	}

	&-leave {
		&-to {
			opacity: 0;
		}
	}

	&-move {
		transition: transform 1s;
	}
}

.photo-gallery-filter {
	display: flex;
	margin: 0 rem(-12);
	flex-wrap: wrap;

	@include media-breakpoint-down(sm) {
		margin: 0 rem(-8);
	}

	&__item {
		border: none;
		border-radius: 0;
		padding: 0;
		background-color: transparent;
		padding: rem(12);
		opacity: 0.3;
		outline: none !important;
		white-space: nowrap;
		@include defaultTransition(opacity);

		@include media-breakpoint-down(sm) {
			padding: rem(4) rem(8);
		}

		&.active,
		&:hover {
			opacity: 1;
		}

		&.no-click {
			pointer-events: none;
		}
	}
}

.photo-gallery-info {
	display: inline-flex;
	align-items: center;
	padding: rem(24) rem(32);
	background-color: $color-light;
	width: auto !important;
	height: rem(80);
	opacity: 0;
	pointer-events: none;
	@include defaultTransition(opacity);

	@include media-breakpoint-down(sm) {
		padding: rem(16) rem(24);
		height: rem(64);
	}

	&.bottom-sticky {
		opacity: 1;
		pointer-events: initial;
	}

	&--no-visible {
		opacity: 0 !important;
		pointer-events: none !important;
	}

	&__title {
		@include text-small;
		font-weight: 700;
		text-transform: uppercase;
		margin-right: 0.4em;
	}

	&__item {
		@include text-small;
		text-transform: lowercase;
		margin-left: 0.4em;
		white-space: nowrap;
	}

	&__clear {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		padding: rem(8);
		background: transparent;
		border-radius: 0;
		margin-right: rem(-8);
		margin-left: rem(16);
		outline: none;

		&:hover {
			.icon {
				transform: rotate(90deg);
			}
		}

		.icon {
			@include defaultTransition(transform);
		}
	}
}
</style>
