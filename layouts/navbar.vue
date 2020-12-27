<template>
	<div class="layout-navbar">
		<HeaderVue/>

		<div class="layout-navbar__content container">
			<div class="layout-navbar__navbar">d</div>
			<Nuxt class="layout-navbar__page"/>
		</div>

		<Footer/>
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
.layout-navbar {
	background-color: $color-white;

	&__content {
		min-height: 100vh;
		padding-left: 0;
		display: flex;
	}

	&__navbar {
		width: rem(300);
		padding-top: rem(112);
		background-color: $color-light;
	}

	&__page {
		padding-top: rem(112);
		flex: 1 1 auto;
	}
}
</style>
