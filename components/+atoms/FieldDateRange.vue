<template>
	<div class="date-range">
		<client-only>
			<!-- Рендер на стороне сервера -->
			<div class="date-range__inputs" slot="placeholder">
				<FieldInput class="date-range__input" :label="labelFrom"/>
				<FieldInput class="date-range__input" :label="labelTo"/>
			</div>

			<!-- Рендер на клиенте -->
			<DatePicker
				is-range
				trim-weeks
				:mode="mode"
				:popover="{ visibility: 'focus' }"
				:masks="masksNormalize"
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
		</client-only>
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
		masks: Object,
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
		},

		masksNormalize() {
			const def = {
				input: 'DD.MM.YYYY',
				title: 'MMMM YYYY',
				weekdays: 'WW'
			};

			return Object.assign({}, def, this.masks);
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
		height: rem(48);
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

			&:focus {
				background-color: inherit !important;
			}

			.is-not-in-month & {
				opacity: 0.3 !important;
			}
		}
	}

	&-highlight {
		--blue-700: transparent !important;
		--white: #{$color-saphire} !important;


		width: rem(40) !important;
		height: rem(40) !important;
	}

	&-popover-content-wrapper {
		--popover-vertical-content-offset: #{rem(12)} !important;
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

	&-arrow,
	&-nav-arrow {
		color: $color-dark !important;
		width: rem(40) !important;
		height: rem(40) !important;
		border: 1px solid transparent !important;
		flex-shrink: 0 !important;

		&:hover {
			border-color: $color-dark !important;
			background-color: transparent !important;
		}

		svg {
			width: rem(26);
			height: rem(26);
		}
	}

	&-nav-title {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none !important;

		&:hover {
			opacity: 0.65;
			background-color: transparent !important;
		}
	}
}
</style>
