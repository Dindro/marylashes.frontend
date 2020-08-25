<template>
	<div class="card-action">
		<div class="card-action__image">
			<image-vue :image="card.image"></image-vue>
		</div>
		<div class="card-action__content">
			<p class="card-action__text text-default" v-html="card.text" data-swiper-parallax-x="-20%"></p>
			<div v-if="card.actions" class="card-action__actions" data-swiper-parallax-x="-40%">
				<actions :actions="card.actions"></actions>
			</div>
		</div>
		<factoid-list class="card-action__factoids" data-swiper-parallax-x="-50%" :factoids="card.factoids"></factoid-list>
	</div>
</template>

<script>
import Image from '+/Image';

export default {
	components: {
		ImageVue: Image
	},
	props: {
		card: {
			image: Object,
			text: String,
			actions: Object,
			factoids: Object,
		}
	}
}
</script>

<style lang="scss">
.card-action {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto auto;
	grid-template-areas:
		"image factoids"
		"content factoids";

	@include media-breakpoint-down(md) {
		grid-template-columns: 65% 35%;
		grid-template-rows: auto auto;
		grid-template-areas:
			"image image"
			"content factoids";
	}

	@include media-breakpoint-down(sm) {
		display: block;
	}

	&__image {
		grid-area: image;
		height: rem(250);
		margin-bottom: rem(48);


		@include media-breakpoint-down(md) {
			margin-right: rem(-$wrapper-gutter-md-1);
			margin-left: rem(-$wrapper-gutter-md-1);
			height: rem(300);
		}

		@include media-breakpoint-down(sm) {
			margin-right: rem(-$wrapper-gutter-sm-1);
			margin-left: rem(-$wrapper-gutter-sm-1);
			height: rem(200);
			margin-bottom: rem(32);
		}

		.image {
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
	}

	&__content {
		grid-area: content;
	}

	&__text {
		max-width: 70%;

		@include media-breakpoint-down(md) {
			max-width: none;
			padding-right: rem(32);
		}

		@include media-breakpoint-down(sm) {
			padding-right: 0;
		}
	}

	&__actions {
		margin-top: rem(32);

		@include media-breakpoint-down(sm) {
			margin-top: rem(24);
		}
	}

	&__factoids {
		grid-area: factoids;

		@include media-breakpoint-up(lg) {
			padding-left: rem(96);
		}

		@include media-breakpoint-only(md) {
			flex-direction: column;

			.factoid-list {
				&__item {
					width: 100%;
				}
			}
		}

		@include media-breakpoint-down(sm) {
			display: none;
		}
	}
}
</style>
