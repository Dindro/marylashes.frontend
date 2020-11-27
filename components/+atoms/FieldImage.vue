<template>
	<div class="field-image">
		<p class="field-image__label">{{ label }}</p>
		<div class="field-image__content">
			<div class="field-image__preview" v-for="(preview, i) in previews" :key="i">
				<div class="field-image-preview">
					<!-- Actions -->
					<image-vue :image="preview"></image-vue>
				</div>
			</div>

			<!-- Fake fill -->
			<span class="field-image__fill" v-if="multiple && true"></span>

			<label class="field-image__action">
				<span class="field-image__box" v-text="placeholder"></span>
				<btn v-if="!multiple && true" class="field-image__change" :button="button"></btn>
				<input
					class="field-image__input"
					:value="value"
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

export default {
	components: {
		Btn,
		ImageVue,
	},

	props: {
		value: String,
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
	},

	data: () => ({
		files: [],
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
		}
	},

	methods: {
		chooseFile(e) {
			const { value, files } = e.target;

			this.files.length = 0;
			if (files && files.length) {
				[...files].forEach(file => {
					const reader = new FileReader();
					reader.onload = e => {
						this.files.push(e.target.result);
					};

					reader.readAsDataURL(file);
				});
			}

			this.$emit('input', value);
		}
	}
}
</script>

<style lang="scss">
$height-box: 160;

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
	height: rem($height-box);

	.image {
		max-height: 100%;
	}
}
</style>
