<template>
	<footer class="footer" ref="footer">
		<div class="footer__container" ref="footerContainer" >
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

			const { footer, footerContainer, overlay } = this.$refs;
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

			tm.fromTo(footerContainer, { yPercent: -50 }, { yPercent: 0 }, 0);

			this.$once('hook:beforeDestroy', () => {
				tm.kill();
				tm = null;
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
	overflow: hidden;

	@include media-breakpoint-down(md) {
		padding-bottom: rem(40);
	}

	@include media-breakpoint-down(sm) {
		padding: rem(64) 0 rem(24);
	}

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

		@include media-breakpoint-down(md) {
			grid-auto-columns: 1fr 1fr 1fr 1fr 1fr;
			grid-auto-rows: auto auto rem(64) auto auto;
			grid-template-areas:
				"logo logo . . ."
				"items items contacts contacts contacts"
				". . . . ."
				"socials socials socials socials socials"
				"address copyright copyright copyright author";
		}

		@include media-breakpoint-down(sm) {
			grid-auto-columns: 1fr 1fr;
			grid-auto-rows: auto auto auto auto auto auto;
			grid-template-areas:
				"logo ."
				"items items"
				"contacts contacts"
				"socials socials"
				"address ."
				"copyright author";
		}
	}

	&__logo {
		margin-bottom: rem(56);

		@include media-breakpoint-down(md) {
			margin-bottom: rem(40);
		}

		@include media-breakpoint-down(sm) {
			margin-bottom: rem(32);
		}
	}

	&__author {
		grid-area: author;
		justify-self: flex-end;
		align-self: center;
	}

	&__author-link {
		display: inline-flex;
		align-items: center;
		opacity: 0.3;
		@include text-small;
		@include defaultTransition(opacity);

		.icon {
			margin-left: 0.3em;
		}

		&:hover {
			opacity: 1;
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

		@include media-breakpoint-down(sm) {
			margin-bottom: rem(24);
		}
	}

	&__contacts {
		grid-area: contacts;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		@include media-breakpoint-down(sm) {
			margin-top: rem(48);

			& > * + * {
				margin-top: rem(24);
			}
		}
	}

	&__contacts-item {
		font-size: rem(40);
		@include default-hover;

		@include media-breakpoint-down(md) {
			font-size: rem(28);
		}

		@include media-breakpoint-down(sm) {
			font-size: rem(20);
		}
	}

	&__socials {
		grid-area: socials;
		justify-self: flex-end;

		@include media-breakpoint-down(md) {
			justify-self: center;
			margin-bottom: rem(8);
		}

		@include media-breakpoint-down(sm) {
			margin-top: rem(16);
			margin-bottom: rem(40);
		}

		.socials {
			height: 100%;

			&__list {
				height: 100%;
				justify-content: space-between;

				@include media-breakpoint-down(md) {
					flex-direction: row;
				}

				li {
					@include media-breakpoint-down(md) {
						margin-top: 0 !important;
						margin-bottom: 0 !important;
					}
				}
			}
		}
	}

	&__copyright {
		grid-area: copyright;
		align-self: center;
		opacity: 0.3;
		@include text-small;

		@include media-breakpoint-only(md) {
			justify-self: center;
		}
	}
}

.footer-address {
	$b: #{&};
	display: inline-block;
	@include text-small;

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
