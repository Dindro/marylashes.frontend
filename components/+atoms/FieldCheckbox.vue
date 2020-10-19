<template>
	<label class="checkbox">
		<input
			class="checkbox__input"
			v-model="value"
			:type="type"
			:id="id"
			:name="name"
			:disabled="disabled"
		>
		<span class="checkbox__cube"></span>
		<span class="checkbox__label" v-if="label" v-html="label"></span>
	</label>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'checkbox'
		},
		label: String,
		disabled: Boolean,
		id: String,
		name: String,
	},

	data: () => ({
		value: false,
	}),
}
</script>

<style lang="scss">
.checkbox {
	$b: #{&};
	display: inline-flex;

	&:hover {
		#{$b}__input:not(:disabled) ~ #{$b}__cube::after {
			opacity: 1;
		}
	}

	&__input {
		@include visually-hidden;

		&:focus ~ #{$b}__cube:after {
			opacity: 1;
		}

		&:disabled ~ * {
			cursor: default;
			opacity: 0.65;

			&#{$b}__cube {
				background-color: $color-light;
			}
		}

		&[type="radio"]:checked ~ * {
			cursor: default;
		}
	}

	&__label {
		display: inline-block;
		padding-left: rem(12);
		cursor: pointer;
		@include text-default;

		a {
			@include line-animate-over;
		}
	}

	&__cube {
		flex-shrink: 0;
		height: rem(24);
		width: rem(24);
		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		border: 1px solid rgba($color-dark, 0.3);
		cursor: pointer;

		&::before {
			content: '';
			position: static;
			display: inline-block;
			width: 60%;
			height: 60%;
			border-radius: inherit;
			background-color: $color-dark;
			opacity: 0;
			@include defaultTransition(opacity);
		}

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			box-shadow: 0px rem(5) rem(10) rem(3) rgba($color-dark, 0.1);
			opacity: 0;
			border-radius: inherit;
			@include defaultTransition(opacity);
		}

		// Style radio
		#{$b}__input[type="radio"] ~ & {
			border-radius: 50%;
		}

		#{$b}__input:checked ~ & {
			&::before {
				opacity: 1;
			}
		}
	}
}
</style>