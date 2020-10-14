<template>
	<div
		class="card-record"
		:class="[
			!card.image && 'card-record--gray',
			card.selected && 'card-record--selected'
		]"
		@click="$emit('select', card)"
	>
		<div v-if="card.image" class="card-record__bg">
			<image-vue :image="card.image" class="card-record__image"></image-vue>
		</div>
		<div class="card-record__content">
			<p v-if="card.text" class="card-record__text">{{ card.text }}</p>
			<div class="card-record__info">
				<p class="card-record__title text-default">{{ card.title }}</p>
				<p v-if="card.price" class="card-record__price text-default">{{ card.price }}₽</p>
			</div>
		</div>
		<div class="card-record__choosen">
			<div class="card-record__circle">
				<icon-vue class="card-record__icon" :icon="{ name: '32/check' }"></icon-vue>
			</div>
		</div>
	</div>
</template>

<script>
import ImageVue from '+/Image';
import IconVue from '+/Icon';

export default {
	components: {
		ImageVue,
		IconVue,
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
.card-record {
	$b: #{&};

	height: rem(160);
	position: relative;
	border-radius: rem(2);
	overflow: hidden;
	color: $color-white;
	cursor: pointer;

	&:hover,
	&--selected {
		#{$b}__bg::after {
			opacity: 0.65;
		}

		#{$b}__circle {
			transform: none;
			opacity: 1;
		}

		#{$b}__text {
			opacity: 0 !important;
		}
	}

	&--selected {
		#{$b}__circle {
			background-color: $color-white;
			color: $color-dark;
		}

		&#{$b}--gray #{$b}__circle {
			background-color: $color-dark;
			color: $color-white;
		}
	}

	&:active {
		#{$b}__icon {
			transform: scale(1.3);
		}
	}

	&__bg {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: $color-dark;
			opacity: 0.45;

			@include defaultTransition(opacity);
		}
	}

	&__content {
		position: relative;
		padding: rem(16);
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	&__info {
		margin-top: auto;
		display: flex;
		justify-content: space-between;
	}

	&__image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&__text {
		@include text-small;
		@include defaultTransition(opacity);
	}

	&__choosen {
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__circle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: rem(72);
		width: rem(72);
		background-color: rgba($color-white, 0.2);
		border-radius: 50%;
		color: rgba($color-white, 0.4);
		opacity: 0;
		transform: translateY(#{rem(16)});

		@include defaultTransition(opacity, transform, background-color, color);
	}

	&__icon {
		@include defaultTransition(transform);
	}

	&--gray {
		background-color: $color-light;
		color: $color-dark;

		#{$b}__circle {
			background-color: rgba($color-dark, 0.2);
			color: rgba($color-dark, 0.4);
		}

		#{$b}__text {
			opacity: 0.65;
		}
	}
}
</style>
