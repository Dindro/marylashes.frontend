<template>
	<div class="list-control">
		<div class="list-control__search">
			<FieldInput v-model="search" v-bind="list.search" />
			<LinkAction v-if="action" :link="action" @click.native="toggleFilter" class="list-control__action"/>
		</div>

		<div v-if="filterActive" class="list-control__filter">
			<div class="list-filter">
				<!-- ListFilter -->
				<!-- От и до  -->
				<!-- Чекбокс статусы -->
				Фильтры
			</div>
		</div>

		<div class="list-control__settings">
			<!-- Чекбокс сортировка -->
		</div>

		<div class="list-control__main">
			<div class="list-control__content">
				<div class="list-control__list">
					<!-- ListView (double view) -->
					<!-- Шапка -->
					<!-- Список -->
				</div>

				<div class="list-control__paginate">
					<!-- PaginateControl -->
					<!-- Показать еще и пагинация -->
				</div>
			</div>

			<slot name="aside"></slot>
		</div>
	</div>
</template>

<script>
import FieldInput from '+/FieldInput';
import LinkAction from '+/LinkAction';

export default {
	components: {
		FieldInput,
		LinkAction,
	},

	/**
	 * actionDisable
	 * action
	 * 		text
	 * 		activeText
	 * search(input)
	 *
	 */
	props: {
		list: {
			type: Object,
		}
	},

	data: () => ({
		search: '',
		filterActive: false,
	}),

	computed: {
		action() {
			if (this.list.actionDisable) return null;

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
		}
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

	&__filter {
		margin-top: rem(16);
	}
}
</style>
