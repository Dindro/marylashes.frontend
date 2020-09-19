<template>
	<div class="layout">
		<cursor-vue></cursor-vue>
		<header-vue></header-vue>
		<Nuxt class="layout__content" />
		<footer-vue></footer-vue>
	</div>
</template>

<script>
import HeaderVue from '&/Header';
import FooterVue from '&/Footer';
import CursorVue from '+/Cursor';

export default {
  components: {
	HeaderVue,
	FooterVue,
	CursorVue,
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
