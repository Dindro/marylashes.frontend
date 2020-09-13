<template>
	<footer class="footer" ref="footer">
		<div class="footer__container">
			<div class="footer__logo">
				<tag-link :link="footer.logo">
					<logo color="dark"></logo>
				</tag-link>
			</div>
			<ul class="footer__items">
				<li v-for="(item, index) in footer.items" :key="index">
					<tag-link class="footer__item" :link="item">
						{{ item.text }}
					</tag-link>
				</li>
			</ul>
			<div class="footer__contacts">
				<p><tag-link class="footer__contacts-item" :link="footer.phone"></tag-link></p>
				<p><tag-link class="footer__contacts-item" :link="footer.mail"></tag-link></p>
			</div>
			<div class="footer__socials">
				<socials :socials="Object.assign({}, footer.socials, { column: true })"></socials>
			</div>
			<div class="footer__address">
				<tag-link class="footer-address" :link="footer.address">
					<p class="footer-address__title">{{ footer.address.city }}</p>
					<p class="footer-address__subtitle">{{ footer.address.street }}</p>
				</tag-link>
			</div>
			<div class="footer__copyright">{{ footer.copyright }}</div>
			<div class="footer__author">
				<tag-link class="footer__author-link" :link="footer.author">
					<span>{{ footer.author.text }}</span>
					<icon-vue :icon="footer.author.icon"></icon-vue>
				</tag-link>
			</div>
		</div>
		<div class="footer__overlay" ref="overlay"></div>
	</footer>
</template>

<script>
import { mapState } from 'vuex';
import Logo from '+/Logo';
import IconVue from '+/Icon';
import TagLink from '+/TagLink';
import Socials from '^/Socials';

import gsap from 'gsap';

export default {
	components: {
		Logo,
		TagLink,
		IconVue,
		Socials,
	},
	computed: {
		...mapState([
			'footer',
		]),
	},
	methods: {
		initAnimation() {
			const { ScrollTrigger } = require('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			const { footer, overlay } = this.$refs;
			const layoutContent = footer.previousElementSibling;

			const tm = gsap.timeline({
				scrollTrigger: {
					trigger: layoutContent,
					start: 'bottom bottom',
					endTrigger: document.documentElement,
					end: 'bottom bottom',
					scrub: true,
				},
			});

			const halfTm = gsap.timeline({
				scrollTrigger: {
					trigger: layoutContent,
					start: 'bottom 80%',
					endTrigger: document.documentElement,
					end: 'bottom bottom',
					scrub: true,
					markers: true,
				},
			});

			tm.fromTo(footer, { yPercent: -30 }, { yPercent: 0 }, 0);
			halfTm.fromTo(overlay, { opacity: 1 }, { opacity: 0 }, 0);

			this.$once('hook:beforeDestroy', () => {
				tm.kill();
				tm = null;
				halfTm.kill();
				halfTm = null;
			});
		}
	},

	mounted() {
		this.initAnimation();
	}
}
</script>

<style lang="scss">
.footer {
	padding: rem(72) 0 rem(80);
	background-color: $color-saphire;
	position: relative;

	&__container {
		@include make-container;
		display: grid;
		grid-auto-columns: 100 / 12 * 4% 100 / 12 * 7% 100 / 12 * 1%;
		grid-auto-rows: auto auto rem(64) auto;
		grid-template-areas:
			"logo . socials"
			"items contacts socials"
			". . ."
			"address copyright author";
	}

	&__logo {
		margin-bottom: rem(56);
	}

	&__author {
		grid-area: author;
		justify-self: flex-end;
		align-self: center;
	}

	&__author-link {
		display: inline-flex;
		align-items: center;
		@include default-hover;
		@include text-small;

		.icon {
			margin-left: 0.3em;
		}
	}

	&__items {
		grid-area: items;
		margin: 0;
		padding: 0;
		list-style: none;
		column-count: 2;
		column-gap: 0;
		margin-bottom: rem(-12);
		margin-top: rem(-12);
	}

	&__item {
		display: inline-block;
		padding: rem(12) 0;
		@include text-default;
		@include default-hover;
	}

	&__address {
		grid-area: address;
	}

	&__contacts {
		grid-area: contacts;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	&__contacts-item {
		font-size: rem(40);
		@include default-hover;
	}

	&__socials {
		grid-area: socials;
		justify-self: flex-end;

		.socials {
			height: 100%;

			&__list {
				height: 100%;
				justify-content: space-between;
			}
		}
	}

	&__copyright {
		grid-area: copyright;
		align-self: center;
		@include text-small;
		opacity: 0.3;
	}

	&__overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
		opacity: 0;
		background-color: rgba($color-dark, 0.4);

		@supports (backdrop-filter: blur(10px)) {
			backdrop-filter: blur(10px);
			background-color: transparent;
		}
	}
}

.footer-address {
	$b: #{&};
	display: inline-block;
	@include text-default;

	&__subtitle {
		opacity: 0.3;
		@include defaultTransition(opacity);
	}

	&:hover {
		#{$b}__subtitle {
			opacity: 1;
		}
	}
}
</style>
