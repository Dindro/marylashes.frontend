<template>
	<div class="avatar" :class="[ size && `avatar--${size}` ]">
		<div class="avatar__image">
			<ImageVue :image="imageNormalize"/>
		</div>
	</div>
</template>

<script>
import ImageVue from '+/Image';

export default {
	components: {
		ImageVue,
	},

	props: {
		size: {
			type: String,
			default: 'default',
			validator: value => ['xs', 'sm', 'default', 'lg'].indexOf(value) !== -1,
		},
		image: String,
		upload: {
			type: Boolean,
			default: false,
		}
	},

	computed: {
		imageNormalize() {
			return {
				src: this.image,
				alt: '👩',
			};
		}
	}
}
</script>

<style lang="scss">
.avatar {
	$b: #{&};

	&__image {
		width: rem(32);
		height: rem(32);
		overflow: hidden;
		border-radius: 50%;
	}

	img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: contain;
	}

	img:not([src]) {
		position: relative;

		&::after {
			content: attr(alt);
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: lighten($color-dark, 70);
			font-size: rem(20);
		}
	}

	&--sm {
		#{$b}__image {
			width: rem(24);
			height: rem(24);
		}

		img:not([src])::after {
			font-size: rem(12);
		}
	}

	&--xs {
		#{$b}__image {
			width: rem(16);
			height: rem(16);
		}

		img:not([src])::after {
			font-size: rem(10);
		}
	}

	&--lg {
		#{$b}__image {
			width: rem(64);
			height: rem(64);
		}

		img:not([src])::after {
			font-size: rem(28);
		}
	}
}
</style>
