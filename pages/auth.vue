<template>
	<div class="container">
		<auth-block :auth="auth" />
	</div>
</template>

<script>
import AuthBlock from '&/AuthBlock';

export default {
	components: {
		AuthBlock,
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
