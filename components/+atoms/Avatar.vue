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
			validator: value => ['default', 'lg'].indexOf(value) !== -1,
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
	&__image {
		width: rem(32);
		height: rem(32);
		overflow: hidden;
		border-radius: 50%;
	}

	img:not([src]) {
		position: relative;
		width: 100%;
		height: 100%;
		display: block;

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
}
</style>
