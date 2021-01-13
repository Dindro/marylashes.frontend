<template>
	<div class="list-control">
		<div class="list-control__search">
			<FieldInput v-model="search" v-bind="list.search"/>
			<LinkAction v-if="action" :link="action" @click.native="toggleFilter" class="list-control__action"/>
		</div>

		<div v-if="list.filter && action" v-show="filterActive" class="list-control__filter">
			<ListFilter :filter="list.filter"/>
		</div>

		<div class="list-control__settings">
			<TabsHeaderSimple v-model="sortSelected" :title="list.sort.title" :items="list.sort.items"/>
		</div>

		<div class="list-control__main">
			<div class="list-control__content">
				<div class="list-control__list">
					<TableData
						:headers="headers"
						:data="data"
						v-model="listItemSelected">
						<template #user="{ value: user }">
							<UserInline
								:image="user.image"
								:name="user.name"/>
						</template>

						<template #status="{ value: status }">
							<Status :id="status"/>
						</template>
					</TableData>
					<!-- ListView (double view) -->
					<!-- Шапка -->
					<!-- Список -->
				</div>
				<Paginate/>
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
import ListFilter from '&/ListFilter';
import TableData from '&/TableData';
import UserInline from '^/UserInline';
import Status from '+/Status';
import Paginate from '^/Paginate';

export default {
	components: {
		FieldInput,
		LinkAction,
		ListPaginate,
		TabsHeaderSimple,
		ListFilter,
		TableData,
		UserInline,
		Status,
		Paginate,
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
		listItemSelected: null,

		headers: [
			{ value: 'user', text: 'Имя' },
			{ value: 'date', text: 'Дата записи' },
			{ value: 'services', text: 'Услуги' },
			{ value: 'price', text: 'Цена' },
			{ value: 'status', text: 'Статус' }],
		data: [
			{ id: 0, user: { name: 'Сергей' }, date: '05.12.2020 14:30', services: 'Classic - Снятие', price: '1400₽', status: 'create' },
			{ id: 1, user: { name: 'Мария', image: 'https://sun7-8.userapi.com/impg/oseuvCEEF7tXzIngF-fWTbUFXSJBROjMGav9tA/3nU1u6JT-uo.jpg?size=50x0&quality=96&crop=6,533,1201,1201&sign=64b76d28f24af17f786b923b633b8984&ava=1' }, date: 'Помощь', services: '2D', price: '1200₽', status: 'cancel' },
			{ id: 3, user: { name: 'Анжелла Семенова', image: false }, date: 'Помощь', services: 'Classic', price: '1000₽', status: 'correct' },]
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

	&__main {
		margin-top: rem(16);
	}
}
</style>
