<template>
	<div class="field-group">
		<p v-if="label" class="field-group__label" :class="label_class" v-text="label"></p>
		<div class="field-group__fields" :class="list_class">
			<field class="field-group__field"
				v-for="(item, i) in fields"
				:key="i"
				v-bind="item"
				:class="item_class" @input="value => $emit('input', { value, index: i })"></field>
		</div>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,

	components: {
		// Решает проблему с рекурсией
		Field: () => import('+/Field'),
	},

	props: {
		label: String,
		label_class: String,
		fields: Array,
		list_class: String,
		item_class: String,
	}
}
</script>

<style lang="scss">
.field-group {
	&__label {
		margin-bottom: rem(16);

		@include text-default;
	}

	&__fields {
		margin: rem(-8) 0;
	}

	&__field {
		padding: rem(8) 0;
	}
}
</style>
