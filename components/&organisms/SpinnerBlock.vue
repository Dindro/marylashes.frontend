<template>
	<div class="spinner-block">
		<spinner class="spinner-block__element"/>
	</div>
</template>

<script>
import Spinner from '+/Spinner';

export default {
	components: {
		Spinner,
	},
}
</script>

<style lang="scss">
.spinner-block {
	display: flex;
	height: 100%;

	&__element {
		margin: auto;
	}
}
</style>
