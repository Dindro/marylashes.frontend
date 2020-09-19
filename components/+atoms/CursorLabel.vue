<template>
	<div class="cursor-label">
		<p class="cursor-label__label">{{ label }}</p>
		<p class="cursor-label__sublabel">{{ sublabel|max }}</p>
	</div>
</template>

<script>
const MAX_CHARS = 7;
export default {
	props: {
		label: {
			type: String,
		},
		sublabel: {
			type: String
		}
	},
	filters: {
		max(value) {
			if (value <= MAX_CHARS) return value;
			return `${value.substr(0, MAX_CHARS)}.`;
		}
	}
}
</script>

<style lang="scss">
.cursor-label {
	width: 100%;
	height: 100%;
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	&__label {
		@include text-default;
		text-transform: lowercase;
		opacity: 0.65;
	}

	&__sublabel {
		@include text-small;
		opacity: 0.3;
	}
}
</style>
