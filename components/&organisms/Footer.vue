<template>
	<footer class="footer">
		<div class="footer__container">
			<div class="footer__logo">
				<tag-link :link="footer.logo">
					<logo></logo>
				</tag-link>
			</div>
			<ul class="footer__items"></ul>
			<div class="footer__contacts"></div>
			<div class="footer__socials"></div>
			<div class="footer__address"></div>
			<div class="footer__copytight"></div>
			<div class="footer__author">
				<tag-link :link="footer.author">
					<span>{{ footer.author.text }}</span>
					<icon-vue :icon="footer.author.icon"></icon-vue>
				</tag-link>
			</div>
		</div>
	</footer>
</template>

<script>
import { mapState } from 'vuex';
import Logo from '+/Logo';
import IconVue from '+/Icon';
import TagLink from '+/TagLink';

export default {
	components: {
		Logo,
		TagLink,
		IconVue,
	},
	computed: {
		...mapState([
			'footer',
		]),
	},
}
</script>

<style lang="scss">
.footer {
	background-color: $color-saphire;

	&__container {
		@include make-container;
		display: grid;
		grid-auto-columns: "#{100 / 12 * 4}% #{100 / 12 * 7}% #{100 / 12}%";
		grid-auto-rows: "auto auto auto";
		grid-template-areas:
			"logo . socials"
			"items contacts socials"
			"address copytight author";
	}
}
</style>
