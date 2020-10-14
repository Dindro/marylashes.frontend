<template>
	<div class="field">
		<componet :is="componentName" v-bind="$attrs">

		</componet>
	</div>
</template>

<script>
import FieldInput from '+/FieldInput'  ;
import FieldCheckbox from '+/FieldCheckbox';

export default {
	components: {
		FieldInput,
		FieldCheckbox,
	},

	props: {
		input: Boolean,
		checkbox: Boolean,
		textarea: Boolean,
	},

	computed: {
		componentName() {
			if (this.input || this.textarea) return 'field-input';
			else if (this.checkbox) return 'field-checkbox';
		}
	}
}
</script>

<style lang="scss">
.field {

}
</style>
