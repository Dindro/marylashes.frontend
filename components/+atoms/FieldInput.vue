<template>
	<div class="input-shell">
		<input
			v-if="isInput"
			class="input"
			v-model="value"
			v-mask="maskComputed"
			:autocomplete="autocomplete"
			:pattern="patternComputed"
			:inputmode="inputmodeComputed"
			:type="type"
			:required="required"
			:readonly="readonly"
			:disabled="disabled"
			:name="name"
			:id="id"
			:placeholder="placeholder"
		>
		<textarea
			v-else
			class="input input--textarea"
			v-model="value"
			v-mask="maskComputed"
			:autocomplete="autocompleteComputed"
			:pattern="patternComputed"
			:inputmode="inputmodeComputed"
			:required="required"
			:readonly="readonly"
			:disabled="disabled"
			:name="name"
			:id="id"
			:placeholder="placeholder"
		>
		</textarea>
		<label class="input-shell-label" :class="[ isExist && 'input-shell-label--exist' ]">{{ label }}</label>
	</div>
</template>

<script>
// README: https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/
// README: https://www.twilio.com/blog/html-attributes-two-factor-authentication-autocomplete

const VueMaskDirective = process.client ? require('v-mask').VueMaskDirective : null;

export default {
	props: {
		required: Boolean,
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

	data: () => ({
		value: '',
	}),

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

			if (this.type === 'tel') return '+7 (###) ### ## ##';
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

	@include defaultTransition(box-shadow);
	@include text-default;

	&:hover,
	&:focus {
		box-shadow: 0px rem(8) rem(20) 0px rgba($color-dark, 0.1);
	}

	@include media-breakpoint-down(sm) {
		height: rem($input-height-sm);
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

	@include defaultTransition(transform);

	@at-root input:focus + &,
	&--exist {
		transform: translateY(-100%) scale(0.8);
	}
}
</style>
