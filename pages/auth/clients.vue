<template>
	<div class="container">

	</div>
</template>

<script>
export default {
	layouts: 'navbar',

	components: {

	},

	asyncData(ctx) {
		return ctx.app.$axios.get('/api/v1/auth').then((res) => {
			return res.data;
		});
  	}
}
</script>

<style>

</style>
