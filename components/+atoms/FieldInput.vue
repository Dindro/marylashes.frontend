<template>
	<div class="input-shell">
		<input
			v-if="isInput"
			class="input"
			v-mask="maskComputed"
			:value="value"
			:autocomplete="autocompleteComputed"
			:pattern="patternComputed"
			:inputmode="inputmodeComputed"
			:type="type"
			:readonly="readonly"
			:disabled="disabled"
			:name="name"
			:id="id"
			:placeholder="placeholder"
			@input="$emit('input', $event.target.value)"
		>
		<textarea
			v-else
			class="input input--textarea"
			v-mask="maskComputed"
			:value="value"
			:autocomplete="autocompleteComputed"
			:pattern="patternComputed"
			:inputmode="inputmodeComputed"
			:readonly="readonly"
			:disabled="disabled"
			:name="name"
			:id="id"
			:placeholder="placeholder"
			@input="$emit('input', $event.target.value)"
		>
		</textarea>
		<label class="input-shell-label" :class="[ isExist && 'input-shell-label--exist' ]">{{ label }}</label>
	</div>
</template>

<script>
// README: https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/
// README: https://www.twilio.com/blog/html-attributes-two-factor-authentication-autocomplete

import { phoneMask } from '@/utils/regex';
const VueMaskDirective = process.client ? require('v-mask').VueMaskDirective : null;

export default {
	inheritAttrs: false,

	props: {
		value: {
			type: String,
			value: '',
		},
		input: Boolean,
		textarea: Boolean,
		type: {
			type: String,
			default: 'text',
		},
		label: String,
		placeholder: String,
		disabled: Boolean,
		readonly: Boolean,
		name: String,
		id: String,
		mask: String,
		autocomplete: String,
		pattern: String,
		inputmode: String,			// Дает понять браузеру - какую клавиатуру вывести на экран
	},

	directives: {
		mask: VueMaskDirective,
	},

	computed: {
		isInput() {
			return (!this.input && !this.textarea || this.input);
		},

		isExist() {
			return this.value !== '';
		},

		maskComputed() {
			if (this.mask) return this.mask;

			if (this.type === 'tel') return phoneMask;
			return null;
		},

		patternComputed() {
			if (this.pattern) return this.pattern;
			return null;
		},

		autocompleteComputed() {
			if (this.mask) return this.mask;

			if (this.type === 'tel') return 'tel';
			return 'on';
		},

		inputmodeComputed() {
			if (this.inputmode) return this.inputmode;

			if (this.type === 'tel') return 'tel';
			return null;
		}
	},
}
</script>

<style lang="scss">
.input {
	border: 1px solid rgba($color-dark, 0.3);
	height: rem($input-height);
	width: 100%;
	outline: none !important;
	padding: rem(20) rem(24) 0 rem(24);
	border-radius: 0;

	@include defaultTransition(box-shadow, border-color);
	@include text-default;

	@include media-breakpoint-down(sm) {
		height: rem($input-height-sm);
	}

	&:hover,
	&:focus {
		box-shadow: 0px rem(8) rem(20) 0px rgba($color-dark, 0.1);
	}

	&::placeholder {
		color: $color-dark;
		opacity: 0.3;
		@include defaultTransition(opacity);
	}

	&:not(:focus)::placeholder {
		opacity: 0;
	}

	@at-root .has-error & {
		border-color: rgba($color-red, 0.5);

		&:hover,
		&:focus {
			box-shadow: 0px rem(8) rem(20) 0px rgba($color-red, 0.1);
		}
	}
}

.input-shell {
	position: relative;
}

.input-shell-label {
	@include text-default;
	position: absolute;
	top: 50%;
	left: rem(24);
	transform: translateY(-50%);
	opacity: 0.65;
	white-space: nowrap;
	transform-origin: left center;
	pointer-events: none;

	@include defaultTransition(transform, color);

	@at-root input:focus + &,
	&--exist {
		transform: translateY(-100%) scale(0.85);
	}

	@at-root .has-error & {
		color: $color-red;
	}
}
</style>
