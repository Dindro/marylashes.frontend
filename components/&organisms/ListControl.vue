<template>
	<div class="list-control">
		<div class="list-control__search">
			<FieldInput v-model="search" v-bind="list.search" />
			<LinkAction v-if="action" :link="action" @click.native="toggleFilter" class="list-control__action"/>
		</div>

		<div v-if="action && filterActive" class="list-control__filter">
			<div class="list-filter">
				<!-- ListFilter -->
				<!-- От и до  -->
				<!-- Чекбокс статусы -->
				<TabsHeaderSimple :title="list.filter_status.title" :items="list.filter_status.items"/>
			</div>
		</div>

		<div class="list-control__settings">
			<TabsHeaderSimple v-model="sortSelected" :title="list.sort.title" :items="list.sort.items"/>
		</div>

		<div class="list-control__main">
			<div class="list-control__content">
				<div class="list-control__list">
					<!-- ListView (double view) -->
					<!-- Шапка -->
					<!-- Список -->
				</div>

				<!-- <ListPaginate class="list-control__paginate"/> -->
				<!-- Показать ещё -->

			</div>

			<slot name="aside"></slot>
		</div>
	</div>
</template>

<script>
import FieldInput from '+/FieldInput';
import LinkAction from '+/LinkAction';
import ListPaginate from '&/ListPaginate';
import TabsHeaderSimple from '^/TabsHeaderSimple';

export default {
	components: {
		FieldInput,
		LinkAction,
		ListPaginate,
		TabsHeaderSimple,
	},

	/**
	 * filterDisable
	 * action
	 * 		text
	 * 		activeText
	 * search(input)
	 * sort
	 *  	title
	 * 		items
	 */
	props: {
		list: {
			type: Object,
		}
	},

	data: () => ({
		search: '',
		sortSelected: null,
		filterActive: false,
	}),

	computed: {
		action() {
			if (this.list.filterDisable) return null;

			const def = {
				tag: 'button',
			};

			const state = this.filterActive ? { text: this.list.action.textActive } : { text: this.list.action.text };
			return Object.assign({}, def, state);
		}
	},

	methods: {
		toggleFilter() {
			this.filterActive = !this.filterActive;
		},

		more() {
			/**
			 * Показать ещё
			 * Меняем в пагинацию на +1
			 */
		},
	},

	created() {
		// Проверка в роутерах на наличии параметров фильтров
		//   Показываем фильтр и назначаем данные
		// Проверка в роутерах на наличии параметров сортировки
		//   Назначаем данные
		// Проверка в роутерах на наличии параметров пагинации
		//   Назначаем данные

		// Получаем список
	},
}
</script>

<style lang="scss">
.list-control {
	&__search {
		position: relative;
	}

	&__action {
		position: absolute;
		top: calc(100% + #{rem(8)});
		right: 0;
	}

	&__settings {
		margin-top: rem(40);
	}

	&__filter {
		margin-top: rem(16);
	}
}
</style>
