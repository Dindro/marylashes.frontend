<template>
	<div class="hero">
		<h1 class="hero__title">{{ hero.title }}</h1>
		<aside class="hero__aside">
			<slot></slot>
		</aside>
	</div>
</template>

<script>
export default {
	props: {
		hero: Object,
	}
}
</script>

<style lang="scss">
.hero {
	display: flex;
	justify-content: space-between;
	align-items: baseline;

	&__title {
		@include h2;
	}

	&__aside {
		margin-left: rem(40);
	}
}
</style>
