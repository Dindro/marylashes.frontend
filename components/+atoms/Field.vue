<template>
	<validation-provider v-if="existRules" :rules="rules" v-slot="{ errors }" slim>
		<div class="field" :class="[ errors.length && 'has-error' ]">
			<component :is="componentName" v-bind="Object.assign({}, $attrs, $props)" @input="value => $emit('input', value)"></component>
			<transition name="slide" mode="out-in">
				<p class="field__error" :key="errors[0]">{{ errors[0] ? errorPrefix : '' }} {{ errors[0] }}</p>
			</transition>
		</div>
	</validation-provider>

	<div class="field" v-else>
		<component :is="componentName" v-bind="Object.assign({}, $attrs, $props)" @input="value => $emit('input', value)"></component>
	</div>

</template>

<script>
import { ValidationProvider, extend } from 'vee-validate';
import { required, regex } from 'vee-validate/dist/rules';
import { phone as phoneRegex } from '@/utils/regex';
import FieldCheckbox from '+/FieldCheckbox';
import FieldInput from '+/FieldInput'  ;

extend('required', {
	...required,
	message: 'Обязательное поле',
});

extend('phone', {
	validate: (value) => regex.validate(value, { regex: phoneRegex }),
	message: 'Неверный телефонный номер',
});

export default {
	inheritAttrs: false,

	components: {
		FieldInput,
		FieldCheckbox,
		ValidationProvider,
	},

	props: {
		input: Boolean,
		checkbox: Boolean,
		textarea: Boolean,
		required: Boolean,
		type: String,
	},

	data: () => ({
		errorPrefix: '*'
	}),

	computed: {
		componentName() {
			if (this.input || this.textarea) return 'field-input';
			else if (this.checkbox) return 'field-checkbox';
		},

		rules() {
			const rules = {};
			if (this.required) rules.required = { allowFalse: false };
			if (this.input && this.type === 'tel') rules.phone = true;

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
