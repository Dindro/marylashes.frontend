<template>
	<article class="card-article" :class="[`card-article--${mode ? mode : 'default'}`]">
		<div class="card-article__image">
			<image-vue
				v-if="card.image"
				:image="Object.assign(
					{},
					card.image,
					{ ratio: card.mode === 'overlay' ? undefined : '5x2' }
				)"
			></image-vue>
		</div>
		<div class="card-article__content">
			<h3 class="card-article__title">{{ card.title }}</h3>
			<info-panel class="card-article__info" :info="card.info"></info-panel>
		</div>
		<tag-link class="card-article__link" :link="card.link"></tag-link>
	</article>
</template>

<script>
import TagLink from '+/TagLink';
import InfoPanel from '+/InfoPanel';
import ImageVue from '+/Image';

export default {
	components: {
		TagLink,
		ImageVue,
		InfoPanel,
	},

	props: {
		card: {
			mode: String,
			image: Object,
			title: String,
			info: Object,
			author: Object,
			link: Object,
		}
	},

	data: (context) => ({
		mode: context.card.image ? context.card.mode : 'gray',
	}),
}
</script>

<style lang="scss">
.card-article {
	$b: #{&};
	position: relative;

	&__info {
		margin-top: rem(8);
	}

	&__link {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	&__title {
		@include defaultTransition(opacity);
	}

	&:hover {
		#{$b}__title {
			opacity: 0.65;
		}
	}

	&--default {
		color: $color-dark;

		#{$b}__content {
			margin-top: rem(16);
		}

		#{$b}__image {
			border-radius: rem(2);
			overflow: hidden;
		}

		#{$b}__title {
			@include line-clamp(1.125rem, 1.4, 2);
			font-weight: 600;
		}
	}

	&--overlay,
	&--gray {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 100%;
		min-height: rem(220);
		border-radius: rem(2);
		padding: rem(32) rem(32) rem(24) rem(24);

		#{$b}__content {
			position: relative;
		}

		#{$b}__title {
			@include line-clamp(1.125rem, 1.4, 3);
			font-weight: 600;
		}
	}

	&--overlay {
		color: $color-white;

		#{$b}__image {
			&,
			&::after {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}

			&::after {
				content: '';
				background-color: rgba($color-dark, 0.5);
			}

			.image {
				height: 100%;
				width: 100%;
			}
		}
	}

	&--gray {
		color: $color-dark;
		background-color: $color-light;

		#{$b}__image {
			display: none;
		}
	}

	&--present {
		color: $color-dark;

		#{$b}__content {
			margin-top: rem(24);
		}

		#{$b}__title {
			@include h1;
		}

		#{$b}__image {
			border-radius: rem(2);
			overflow: hidden;
		}
	}
}
</style>
