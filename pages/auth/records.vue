<template>
	<div class="container">
		<Hero :hero="hero" class="mb-48">
			<div class="hero-inner">
				<div class="hero-inner__action">
					<LinkAction :link="hero.action"/>
				</div>
				<div v-if="hero.views" class="hero-inner__view">
					<TabsHeaderSimple :title="hero.views.title" :items="hero.views.items" v-model="viewSelected"/>
				</div>
			</div>
		</Hero>

		<ListControl v-if="viewSelected === 0" :list="list"/>

		<template v-else-if="viewSelected === 1">
			Calendar
		</template>
	</div>
</template>

<script>
import Hero from '&/Hero';
import LinkAction from '+/LinkAction';
import TabsHeaderSimple from '^/TabsHeaderSimple';
import ListControl from '&/ListControl';

export default {
	layout: 'navbar',

	components: {
		Hero,
		LinkAction,
		ListControl,
	},

	asyncData(ctx) {
		return ctx.app.$axios.get('/api/v1/auth-records').then((res) => {
			return res.data;
		});
  	},

	data: () => ({
		viewSelected: 0,
	}),
}
</script>

<style lang="scss">
.hero-inner {
	display: flex;

	> * + * {
		margin-left: rem(40);
	}

	&__view {
		display: flex;
	}

	&__view-title {
		@include text-default;
		margin-right: rem(16);
		opacity: 0.3;
	}
}
</style>
