<template>
	<div class="container">
		<Hero :hero="hero" class="mb-48">
			<LinkAction :link="hero.action"/>
		</Hero>
	</div>
</template>

<script>
export default {
	layout: 'navbar',

	components: {

	},

	asyncData(ctx) {
		return ctx.app.$axios.get('/api/v1/auth-clients').then((res) => {
			return res.data;
		});
  	}
}
</script>

<style>

</style>
