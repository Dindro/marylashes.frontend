<template>
	<div class="card-review" :class="[`card-review--${card.type || 'default'}`]">
		<div class="card-review__image">
			<image-vue :image="Object.assign({}, card.image, { ratio: '5x3'})"></image-vue>
		</div>
		<div class="card-review__content">
			<h4 v-if="card.title" class="card-review__title">{{ card.title }}</h4>
			<p class="card-review__text">{{ card.text }}</p>
			<author class="card-review__author" :author="Object.assign({}, card.author, { inline: true })"></author>
		</div>
	</div>
</template>

<script>
import ImageVue from '+/Image';
import Author from '^/Author';

export default {
	components: {
		ImageVue,
		Author,
	},
	props: {
		card: {
			type: Object,
			required: true,
		}
	}
}
</script>

<style lang="scss">
.card-review {
	$b: #{&};

	display: flex;

	&__image {
		width: 50%;
		padding-right: rem(112);
	}

	&__content {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	&__title {
		max-width: rem(380);
		margin-bottom: rem(32);
		@include text-lead-charter;
	}

	&__text {
		@include text-small-charter;
	}

	&__author {
		margin-top: rem(64);
	}

	&--reverse {
		flex-direction: row-reverse;

		#{$b}__image {
			padding: 0 0 0 rem(112);
		}
	}
}
</style>
