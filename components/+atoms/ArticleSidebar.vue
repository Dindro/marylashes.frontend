<template>
	<div class="article-sidebar">
		<slot></slot>
	</div>
</template>

<style lang="scss">
.article-sidebar {
	float: right;
	width: rem(374);
	margin-bottom: rem(16);

	@include media-breakpoint-down(md) {
		float: none;
		margin-top: rem(32);
		margin-bottom: rem(32);
	}

	@include media-breakpoint-down(sm) {
		width: auto;
	}

	a {
		@include text-default;
		@include line-animate-over;
	}
}
</style>
