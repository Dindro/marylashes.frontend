<template>
	<div class="review-slider-list">
		<h2 v-if="review_slider_list.title" class="review-slider-list__title">{{ review_slider_list.title }}</h2>
		<div class="review-slider-list__items">
			<card-review-slider
				class="review-slider-list__item"
				v-for="(item, index) in review_slider_list.items"
				:key="index"
				:card_review_slider="Object.assign({}, item, { type: index % 2 ? 'reverse' : false })"
			></card-review-slider>
		</div>
		<div
			v-if="review_slider_list.actions"
			class="review-slider-list__actions"
			:class="[review_slider_list.items.length % 2 == 0 && 'review-slider-list__actions--reverse']"
		>
			<actions :actions="review_slider_list.actions"></actions>
		</div>
	</div>
</template>

<script>
import CardReviewSlider from '&/CardReviewSlider';
import Actions from '^/Actions';

export default {
	components: {
		CardReviewSlider,
		Actions,
	},

	props: {
		review_slider_list: {
			type: Object,
			required: true,
		}
	},
}
</script>

<style lang="scss">
.review-slider-list {
	&__title {
		margin-bottom: rem(64);
		@include h2;

		@include media-breakpoint-down(sm) {
			margin-bottom: rem(32);
		}
	}

	&__item {
		&:not(:last-child) {
			margin-bottom: rem(156);

			@include media-breakpoint-down(md) {
				margin-bottom: rem(80);
			}

			@include media-breakpoint-down(sm) {
				margin-bottom: rem(48);
			}
		}
	}

	&__actions {
		padding-top: rem(48);

		@include media-breakpoint-down(sm) {
			padding-top: rem(32);
		}

		&--reverse {
			.actions {
				justify-content: flex-end;
			}
		}

		.actions {
			@include media-breakpoint-down(sm) {
				justify-content: center;
			}
		}
	}
}
</style>
