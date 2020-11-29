<template>
	<div class="field-image">
		<p class="field-image__label">{{ label }}</p>
		<div class="field-image__content">
			<div class="field-image__preview" v-for="(preview, i) in previews" :key="i">
				<div class="field-image-preview">
					<!-- Actions -->
					<button type="button" class="field-image-preview__action" @click="removeFile(i)">
						<icon-vue :icon="{ name: '24/cross' }"></icon-vue>
					</button>
					<image-vue :image="preview"></image-vue>
				</div>
			</div>

			<!-- Fake fill -->
			<span class="field-image__fill" v-if="!visibleBox"></span>

			<label class="field-image__action">
				<span v-if="visibleBox" class="field-image__box" v-text="placeholder"></span>
				<btn v-else class="field-image__change" :button="button"></btn>

				<input
					class="field-image__input"
					:name="name"
					type="file"
					accept="image/*"
					v-bind="{ multiple }"
					@change="chooseFile">
			</label>
		</div>

	</div>
</template>

<script>
import Btn from '+/Button';
import ImageVue from '+/Image';
import IconVue from '+/Icon';

const VALUE_EMPTY = '';

export default {
	components: {
		Btn,
		ImageVue,
		IconVue,
	},

	props: {
		value: {},
		label: String,
		name: String,
		placeholder: {
			type: String,
			default: 'Нажмите чтобы выбрать',
		},
		change: {
			type: String,
			default: 'Сменить фото',
		},
		multiple: Boolean,
		max: {
			type: Number,
			default: 10,
		},
	},

	data: () => ({
		files: [],
		valueWatch: true,
	}),

	computed: {
		button() {
			return {
				text: this.change,
				color: 'outline-dark',
				tag: 'div',
			}
		},

		previews() {
			return this.files.map((file, index) => ({
				src: file,
				alt: `User image preview ${index}`,
			}));
		},

		visibleBox() {
			if (this.multiple) {
				if (typeof this.value === 'string') return true;

				return this.value.length < this.max;
			} else {
				return !this.value;
			}
		}
	},

	methods: {
		chooseFile(e) {
			const { files } = e.target;
			let value;

			if (this.multiple) {
				value = [...files];
				// Урежем выбранные файлы
				if (typeof this.max === 'number' && value.length > this.max) {
					value.length = this.max;
				}
			}
			else if (files[0]) value = files[0];
			else value = VALUE_EMPTY;

			this.$emit('input', value);
		},

		async removeFile(index) {
			// Оптимизация
			this.valueWatch = false;

			if (this.multiple) this.value.splice(index, 1);
			else this.$emit('input', VALUE_EMPTY);
			this.files.splice(index, 1);

			// Оптимизация
			await this.$nextTick();
			this.valueWatch = true;
		}
	},

	watch: {
		value(value) {
			if (!this.valueWatch) return;

			let files = value;
			if (!this.multiple) {
				files = [ value ];
			}

			this.files = [];
			if (files && files.length) {
				[...files].forEach(file => {
					if (!file) return;

					const reader = new FileReader();
					reader.onload = e => {
						this.files.push(e.target.result);
					};

					reader.readAsDataURL(file);
				});
			}
		}
	}
}
</script>

<style lang="scss">
$height-box: 160;
$height-box-sm: 128;

.field-image {
	&__label {
		@include text-default;
		opacity: 0.65;
		margin-bottom: rem(16);
	}

	&__input {
		@include visually-hidden;
	}

	&__box {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: rgba($color-dark, 0.65);
		padding: rem(16) rem(32);
		border: 1px dashed rgba($color-dark, 0.3);
		height: rem($height-box);
		text-align: center;

		@include text-default;
		@include defaultTransition(border-color, color);

		@include media-breakpoint-down(sm) {
			height: rem($height-box-sm);
		}

		&:hover {
			color: $color-dark;
			border-color: $color-dark;
		}
	}

	&__action {
		padding: rem(8);
	}

	&__content {
		display: flex;
		flex-wrap: wrap;
		margin: rem(-8);
	}

	&__preview {
		padding: rem(8);
	}

	&__fill {
		width: 100%;
	}
}

.field-image-preview {
	$b: #{&};

	height: rem($height-box);
	position: relative;

	@include media-breakpoint-down(sm) {
		height: rem($height-box-sm);
	}

	&:hover {
		&::before,
		#{$b}__action {
			opacity: 1;
			pointer-events: initial;
		}
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		width: 100%;
		background-image: linear-gradient(to bottom, rgba($color-dark, 0.65) 0%, rgba($color-dark, 0.15) 55%, rgba($color-dark, 0) 100%);
		pointer-events: none;
		opacity: 0;

		@include defaultTransition(opacity);
	}

	&__action {
		position: absolute;
		display: inline-flex;
		top: rem(4);
		right: rem(4);
		padding: rem(8);
		border: none;
		border-radius: 0;
		background: none;
		color: $color-white;
		pointer-events: none;
		opacity: 0;

		@include defaultTransition(opacity);
	}

	&::before,
	&__action {
		@include mediaTouch {
			opacity: 1;
			pointer-events: initial;
		}
	}

	.image {
		height: 100%;
		max-height: 100%;
		object-fit: cover;
	}
}
</style>
