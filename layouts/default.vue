<template>
	<div class="layout">
		<header-vue></header-vue>
		<Nuxt class="layout__content" />
		<footer-vue></footer-vue>
	</div>
</template>

<script>
import HeaderVue from '&/Header';
import FooterVue from '&/Footer';

export default {
  components: {
	HeaderVue,
	FooterVue,
  }
}
</script>

<style lang="scss">
.layout {
	background-color: $color-white;
	overflow-x: hidden;
	overflow-y: hidden;
}
</style>
