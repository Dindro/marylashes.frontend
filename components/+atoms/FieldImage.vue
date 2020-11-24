<template>
	<div class="field-image">
		<label class="field-image__label">{{ label }}</label>
		<input type="file" multiple>
	</div>
</template>

<script>
export default {
	props: {
		label: String,
	}
}
</script>

<style lang="scss">
	.field-image {

	}
</style>
