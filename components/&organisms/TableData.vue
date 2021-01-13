<template>
	<div class="table-data" :class="[ hasInput && 'has-input' ]">
		<div class="table-data__inner">
			<table>
				<thead>
					<tr>
						<th v-if="numerical" class="table-data-numerical">#</th>
						<th v-for="header in headers" :key="header.value">
							{{ header.text }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, index) in data"
						:key="item.id"
						:class="{ 'is-selected': item.id === value }"
						@click="onClickRow(item.id)">
						<td v-if="numerical" class="table-data-numerical">{{ index + 1 }}</td>
						<td v-for="{ value } in headers" :key="value">
							<slot :name="value" :value="item[value]">
								{{ item[value] }}
							</slot>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		numerical: {
			type: Boolean,
			default: true,
		},
		headers: Array,
		data: Array,
		value: Number,
	},

	computed: {
		hasInput() {
			return this.$listeners.input;
		}
	},

	methods: {
		onClickRow(id) {
			if (!this.hasInput) return;

			this.$emit('input', id);
		}
	}
}
</script>

<style lang="scss">
.table-data {
	&__inner {
		margin: 0 rem(-24);
	}

	table {
		width: 100%;
		@include text-default;
	}

	// Отступы
	th,
	td {
		height: rem(48);
		min-height: rem(48);
		padding-top: rem(8);
		padding-bottom: rem(8);
		padding-right: rem(16);

		&:first-child {
			padding-left: rem(24);
		}

		&:last-child {
			padding-right: rem(24);
		}

		&.table-data-numerical {
			padding-right: rem(24);
		}
	}

	// Цвета
	th {
		opacity: 0.3;
	}

	// Интерактив
	tbody tr {
		&:hover,
		&.is-selected {
			background-color: $color-light;
		}
	}

	&.has-input {
		tbody tr {
			cursor: pointer;
		}
	}
}

.table-data-numerical {
	// Занимает самый минимальный размер
	width: 1px;
	opacity: 0.3;
}
</style>
