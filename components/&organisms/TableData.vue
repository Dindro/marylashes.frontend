<template>
	<div class="table-data">
		<div class="table-data__inner">
			<table>
				<thead>
					<tr>
						<th v-if="numerical">#</th>
						<th v-for="header in headers" :key="header.value">
							{{ header.text }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, i) in data" :key="i">
						<td v-if="numerical" class="table-data-numerical">{{ i + 1 }}</td>
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
	td,
	th {
		height: rem(48);
		min-height: rem(48);
		padding-left: 0;
		padding-top: rem(8);
		padding-bottom: rem(8);

		&:not(:last-child) {
			padding-right: rem(16);
		}
	}

	tr td:first-child,
	tr th:first-child {
		padding-left: rem(24);
		padding-right: rem(24);
	}

	// Цвета
	th {
		opacity: 0.3;
	}

	// Интерактив
	tbody tr {
		// @include defaultTransition(background-color);

		&:hover {
			background-color: $color-light;
		}
	}
}

.table-data-numerical {
	opacity: 0.3;
}
</style>
