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
			v-on="listeners"
		>
		<template v-else>
			<textarea
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
				v-on="listeners"
			>
			</textarea>
			<div class="input-shell-label-bg"></div>
		</template>

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
			default: '',
		},
		input: Boolean,
		inputNative: {
			// Нативый input событие вызывается по умолчанию
			type: Boolean,
			default: true,
		},
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

		// Дает понять браузеру - какую клавиатуру вывести на экран
		inputmode: String,
	},

	directives: {
		mask: VueMaskDirective,
	},

	computed: {
		isInput() {
			return (!this.input && !this.textarea || this.input);
		},

		isExist() {
			return !!this.value;
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
		},

		listeners() {
			// События по умолчанию
			const def = {
				// Если включен нативный способ то вызываем его
				...this.inputNative && { input: this.onInput },
			};

			return {
				...this.$listeners,
				...def,
			};
		}
	},

	methods: {
		onInput(e) {
			this.$emit('input', e.target.value);
		}
	}
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

	&--textarea {
		display: block;
		padding-top: rem(29);
		padding-bottom: rem(4);
		min-height: rem($input-height);
		height: rem(160);

		@include media-breakpoint-down(sm) {
			padding-top: rem(28);
			min-height: rem($input-height-sm);
		}
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
	top: rem(19);
	left: rem(24);
	opacity: 0.65;
	white-space: nowrap;
	transform-origin: left center;
	pointer-events: none;

	@include media-breakpoint-down(sm) {
		top: rem(17);
	}

	@include defaultTransition(transform, color);

	@at-root input:focus ~ &,
	textarea:focus ~ &,
	&--exist {
		transform: translateY(-50%) scale(0.85);
	}

	@at-root .has-error & {
		color: $color-red;
	}
}

.input-shell-label-bg {
	position: absolute;
	top: 1px;
	left: 1px;
	right: 16px;
	background-image: linear-gradient(to bottom, rgba($color-white, 1) 0%, rgba($color-white, 1) 75%, rgba($color-white, 0) 100%);
	height: rem(36);
	pointer-events: none;
}
</style>
