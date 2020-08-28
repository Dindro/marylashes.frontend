<template>
	<div class="card-theme-list">
		<h2 class="card-theme-list__title">{{ card_theme_list.title }}</h2>
		<div class="card-theme-list__items">
			<card-theme v-for="(item, index) in card_theme_list.items" :key="index" :card="item"></card-theme>
		</div>
		<div class="card-theme-list__actions">
			<actions :actions="card_theme_list.actions"></actions>
		</div>
	</div>
</template>

<script>
import CardTheme from '^/CardTheme';
import Actions from '^/Actions';

export default {
	components: {
		CardTheme,
		Actions,
	},
	props: {
		card_theme_list: {
			title: String,
			items: Array,
			actions: Array,
		}
	}
}
</script>

<style lang="scss">
.card-theme-list {
	&__title {
		margin-bottom: rem(24);
		@include h4;
	}

	&__actions {
		margin-top: rem(16);
	}
}
</style>
