<template>
	<div class="date-range">
		<DatePicker
			is-range
			:mode="mode"
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
</style>
