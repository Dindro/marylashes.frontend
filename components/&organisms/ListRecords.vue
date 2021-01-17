<template>
	<TableData
		v-bind="$attrs"
		v-on="$listeners"
		:headers="headersData">
		<template #user="{ value: user }">
			<UserInline
				:image="user.image"
				:name="user.name"/>
		</template>

		<template #status="{ value: status }">
			<Status :id="status"/>
		</template>
	</TableData>
</template>

<script>
import TableData from '&/TableData';
import UserInline from '^/UserInline';
import Status from '+/Status';

export default {
	components: {
		TableData,
		UserInline,
		Status,
	},

	inheritAttrs: false,

	props: {
		headers: Array,
	},

	data: () => ({
		headersDefault: [
			{ value: 'user', text: 'Имя' },
			{ value: 'date', text: 'Дата записи' },
			{ value: 'services', text: 'Услуги' },
			{ value: 'price', text: 'Цена' },
			{ value: 'status', text: 'Статус' }],
	}),

	computed: {
		headersData() {
			return this.headers || this.headersDefault;
		},
	},
};
</script>
