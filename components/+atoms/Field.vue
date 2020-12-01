<template>
	<!-- Filed group -->
	<field-group v-if="group" v-bind="Object.assign({}, $attrs, $props)" @input="value => $emit('input', value)"></field-group>

	<!-- Field validation -->
	<validation-provider v-else-if="existRules" :rules="rules" :name="name" v-slot="{ errors }" slim>
		<div class="field" :class="[ errors.length && 'has-error' ]">
			<component :is="componentName" v-bind="Object.assign({}, $attrs, $props)" @input="value => $emit('input', value)"></component>
			<transition name="slide" mode="out-in">
				<p class="field__error" :key="errors[0]">{{ errors[0] ? errorPrefix : '' }} {{ errors[0] }}</p>
			</transition>
		</div>
	</validation-provider>

	<!-- Field -->
	<div class="field" v-else>
		<component :is="componentName" v-bind="Object.assign({}, $attrs, $props)" @input="value => $emit('input', value)"></component>
	</div>

</template>

<script>
import { ValidationProvider, extend } from 'vee-validate';
import { required, regex, size, image } from 'vee-validate/dist/rules.umd';
import { phone as phoneRegex } from '@/utils/regex';
import FieldCheckbox from '+/FieldCheckbox';
import FieldInput from '+/FieldInput';
import FieldGroup from '+/FieldGroup';
import FieldImage from '+/FieldImage';

extend('required', {
	...required,
	message: 'Обязательное поле',
});

extend('phone', {
	validate: (value) => regex.validate(value, { regex: phoneRegex }),
	message: 'Неверный телефонный номер',
});

extend('size', {
	...size,
	message: 'Изображение не должно превышать {size}КБ',
});

extend('image', {
	...image,
	message: 'Файл должен быть изображением',
});

export default {
	inheritAttrs: false,

	components: {
		FieldInput,
		FieldCheckbox,
		ValidationProvider,
		FieldGroup,
		FieldImage,
	},

	props: {
		input: Boolean,
		checkbox: Boolean,
		textarea: Boolean,
		image: Boolean,
		group: Boolean,
		required: Boolean,
		type: String,
		name: String,
		maxSize: [String, Number],
	},

	data: () => ({
		errorPrefix: '*'
	}),

	computed: {
		componentName() {
			if (this.input || this.textarea) return 'field-input';
			else if (this.checkbox) return 'field-checkbox';
			else if (this.image) return 'field-image';
		},

		rules() {
			const rules = {};
			if (this.required) rules.required = { allowFalse: false };
			if (this.input && this.type === 'tel') rules.phone = true;
			if (this.image) rules.image = true;
			if (this.maxSize) rules.size = this.maxSize;

			return rules;
		},

		existRules() {
			return Object.keys(this.rules).length !== 0;
		}
	},
}
</script>

<style lang="scss">
.field {
	position: relative;

	&__error {
		@include text-small;

		position: absolute;
		color: $color-red;
		margin-top: rem(4);

		@include media-breakpoint-down(sm) {
			margin-top: rem(2);
		}
	}
}
</style>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
	transition: transform .2s $easing, opacity .2s $easing;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(#{rem(-4)});
}
</style>
