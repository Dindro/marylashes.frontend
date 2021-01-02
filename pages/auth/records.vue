<template>
	<div class="container">
		<Hero :hero="hero">

		</Hero>
	</div>
</template>

<script>
import Hero from '&/Hero';
import LinkAction from '+/LinkAction';

export default {
	layout: 'navbar',

	components: {
		Hero,
		LinkAction,
	},

	asyncData(ctx) {
		return ctx.app.$axios.get('/api/v1/auth-records').then((res) => {
			return res.data;
		});
  	}
}
</script>

<style>

</style>
