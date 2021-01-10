<template>
	<div class="date-range">
		<DatePicker
			is-range
			:mode="mode"
			:popover="{ visibility: 'focus' }"
			:masks="masks"
			:value="value"
			@input="input">
			<template v-slot="{ inputValue, inputEvents }">
				<div class="date-range__inputs">
					<FieldInput
						class="date-range__input"
						:label="labelFrom"
						:value="inputValue.start"
						:inputNative="false"
						v-on="inputEvents.start"/>
					<FieldInput
						class="date-range__input"
						:label="labelTo"
						:value="inputValue.end"
						:inputNative="false"
						v-on="inputEvents.end"
						inputEventOverride/>
					<LinkAction
						v-if="visibleReset"
						v-show="showReset"
						class="date-range__reset"
						@click.native="resetFields"
						:link="reset"/>
				</div>
			</template>
		</DatePicker>
	</div>
</template>

<script>
import FieldInput from '+/FieldInput';
import LinkAction from '+/LinkAction';

let DatePicker;
if (process.client) {
	DatePicker = require('v-calendar/lib/components/date-picker.umd');
}

export default {
	components: {
		DatePicker,
		FieldInput,
		LinkAction,
	},

	props: {
		value: Object,
		masks: {
			type: Object,
			default() {
				return {
        			input: 'DD.MM.YYYY',
					title: 'MMMM YYYY',
					weekdays: 'WW'
				};
			},
		},
		mode: String,
		labelFrom: String,
		labelTo: String,
		visibleReset: {
			type: Boolean,
			default: false,
		}
	},

	data: () => ({
		reset: {
			text: 'Сбросить',
			tag: 'button'
		}
	}),

	computed: {
		showReset() {
			return this.value.start || this.value.end;
		}
	},

	methods: {
		input(value) {
			this.$emit('input', value)
		},

		resetFields() {
			this.input({
				start: null,
				end: null,
			});
		}
	}
};
</script>

<style lang="scss">
.date-range {
	display: inline-block;
	position: relative;

	&__input {
		& + & {
			margin-left: rem(16);
		}
	}

	&__reset {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: calc(100% + #{rem(16)});
	}

	&__inputs {
		display: flex;
	}
}

.vc {
	&-container {
		--rounded: 0px !important;
		--rounded-lg: 0px !important;
		--rounded-full: 0px !important;
		--popover-vertical-content-offset: #{rem(8)} !important;
		--shadow-lg: 0px #{rem(8)} #{rem(20)} 0px #{rgba($color-dark, 0.1)} !important;
		--blue-600: #{$color-saphire} !important;
		--blue-200: #{rgba($color-saphire, 0.3)} !important;

		border-color: rgba($color-dark, 0.3);
	}

	&-title,
	&-weekday,
	&-day-content,
	&-nav-title,
	&-nav-item {
		@include text-default(!important);
		color: $color-dark !important;
	}

	&-title {
		text-transform: capitalize;
	}

	&-weekday {
		height: rem(40);
		padding: 0 !important;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	&-header {
		padding: rem(8) rem(8) 0 !important;
	}

	&-weeks {
		padding: 0 rem(8) rem(8) !important;
	}

	&-weekday {
		opacity: 0.3;
		text-transform: capitalize;
	}

	&-pane {
		min-width: rem(296) !important;
	}

	&-day {
		min-height: rem(40) !important;

		&-content {
			width: rem(40) !important;
			height: rem(40) !important;

			&:hover {
				border: 1px solid $color-dark;
				background-color: transparent !important;
			}
		}
	}

	&-highlight {
		width: rem(40) !important;
		height: rem(40) !important;
	}

	&-popover-container {

	}

	&-popover-caret {
		display: none !important;
	}

	&-nav-items {
		grid-row-gap: 0px !important;
		grid-column-gap: 0px !important;
	}

	&-nav-item {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: rem(64) !important;
		height: rem(40);
		border: none !important;
		padding: 0 !important;

		&.is-active {
			background-color: $color-saphire !important;
			box-shadow: none !important;
			font-weight: 400 !important;
			color: $color-dark !important;
		}

		&:not(.is-active):hover {
			background-color: transparent !important;
			border: 1px solid $color-dark !important;
			box-shadow: none !important;
		}
	}

	&-nav-popover-container {
		border-color: rgba($color-dark, 0.3);
		background-color: $color-white;
		padding: rem(8) !important;
	}

	&-arrows-container {
		padding: rem(8) rem(8) 0 !important;
	}
}
</style>
