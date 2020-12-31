<template>
	<div class="layout-navbar">
		<HeaderVue/>

		<div class="layout-navbar__content container">
			<Navbar class="layout-navbar__navbar" :navbar="navbar"/>
			<Nuxt class="layout-navbar__page"/>
		</div>

		<Footer/>
	</div>
</template>

<script>
import HeaderVue from '&/Header';
import FooterVue from '&/Footer';
import Navbar from '&/Navbar';
import { mapState } from 'vuex';

export default {
	components: {
		HeaderVue,
		FooterVue,
		Navbar,
	},

	computed: {
		...mapState([
			'navbar',
		]),
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
		width: rem(288);
		padding-top: rem(112);
		flex-shrink: 0;
	}

	&__page {
		padding-top: rem(112);
		flex: 1 1 auto;

		&.container,
		.container {
			padding-right: 0;
			padding-left: rem(80);
		}
	}
}
</style>
