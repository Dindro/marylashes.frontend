<template>
	<div class="container">
		<Hero :hero="hero" class="mb-48">
			<div class="hero-inner">
				<div class="hero-inner__action">
					<LinkAction :link="hero.action"/>
				</div>
				<div v-if="hero.views" class="hero-inner__view">
					<p v-if="hero.views.title" class="hero-inner__view-title">{{ hero.views.title }}</p>

					<TabsHeaderSimple :items="hero.views.items" v-model="viewSelected" v-slot="scope">
						<LinkAction :link="scope.item" @click.native="scope.onClick"/>
					</TabsHeaderSimple>
				</div>
			</div>
		</Hero>

		<ListControl :list="list"/>
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

	data: () => ({
		viewSelected: 0,
	}),

	asyncData(ctx) {
		return ctx.app.$axios.get('/api/v1/auth-records').then((res) => {
			return res.data;
		});
  	}
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
