<template>
	<aside class="navbar">
		<nav>
			<ul class="navbar__list">
				<li v-for="(item, i) in navbar.items" :key="i">
					<TagLink class="navbar-item" :link="item">
						<span class="navbar-item__text">{{ item.text }}</span>
						<Count v-if="item.count" :count="item.count"></Count>
					</TagLink>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script>
import TagLink from '+/TagLink';
import Count from '+/Count';

export default {
	сomponents: {
		TagLink,
	},

	props: {
		navbar: {
			type: Object,
			required: true,
		}
	},
}
</script>

<style lang="scss">
.navbar {
	background-color: $color-light;

	&__list {
		padding: 0;
		margin: 0;
		list-style: none;
	}
}

.navbar-item {
	display: flex;
	align-items: center;
	height: rem(48);
	padding-left: rem(40);
	padding-right: rem(8);
	position: relative;

	@include text-default;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: $color-white;
		transform: scaleX(0);
		transform-origin: left;

		@include defaultTransition(transform);
	}

	&:hover,
	&.nuxt-link-active {
		&::before {
			transform: none;
		}
	}

	& > * {
		position: relative;
	}

	.count {
		margin-left: rem(4);
	}
}
</style>
