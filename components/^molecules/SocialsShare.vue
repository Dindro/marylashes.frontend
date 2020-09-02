<template>
	<div
		class="socials-share ya-share2"
		data-bare
		data-services="vkontakte,facebook,whatsapp,telegram,viber,odnoklassniki"
		:data-title="socials.title || ''"
		:data-text="socials.text || ''"
		:data-image="socials.image || ''"
	></div>
</template>

<script>
export default {
	props: {
		socials: {
			type: Object,
			required: true,
		}
	},

	head:() => ({ script: [{ src: '//yastatic.net/share2/share.js' }] }),
}
</script>

<style lang="scss">
.ya-share2 {
	$b: #{&};
	@include text-default;

	&__list {
		display: flex;
		padding: 0;
		margin: 0;
		list-style: none;
		margin: 0 rem(-12);
	}

	&__item {
		width: rem(48);
		height: rem(48);
	}

	&__link {
		display: inline-flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		opacity: 0.3;

		@include defaultTransition(opacity, transform);

		&:hover {
			opacity: 1;
			transform: translateY(#{rem(-6)});
		}

		&::after {
			position: static;
			display: inline;

			@at-root #{$b}__item_service_vkontakte & {
				content: 'Vk';
			}

			@at-root #{$b}__item_service_facebook & {
				content: 'Fb';
			}

			@at-root #{$b}__item_service_whatsapp & {
				content: 'Wh';
			}

			@at-root #{$b}__item_service_telegram & {
				content: 'Tm';
			}

			@at-root #{$b}__item_service_viber & {
				content: 'Vb';
			}

			@at-root #{$b}__item_service_odnoklassniki & {
				content: 'Ok';
			}
		}
	}

	&__badge,
	&__title {
		display: none;
	}
}
</style>
