<template>
	<div class="hero-article">
		<div class="hero-article__article hero-article__item">2</div>
		<div class="hero-article__themes hero-article__item">
			1
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.hero-article {
	display: flex;

	@include media-breakpoint-up(lg) {
		margin: 0 rem(-20);
	}

	&__item {
		@include media-breakpoint-up(lg) {
			padding: 0 rem(20);
		}
	}

	&__article {
		width: calc(100% / 3 * 2);
	}

	&__themes {
		width: calc(100% / 3);
	}
}
</style>
