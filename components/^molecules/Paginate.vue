<template>
	<ul class="paginate" :class="[ align && `paginate--${align}`]">
		<li v-for="(item, i) in items" :key="i">
			<LinkAction
				:link="item"
				:class="{ 'is-active': !item.motion && item.value === value }"
				class="paginate-item"
				@click.native="onClick($event, item.value)"/>
		</li>
	</ul>
</template>

<script>
import LinkAction from '+/LinkAction';

export default {
	components: {
		LinkAction,
	},

	props: {
		url: {
			type: [String, Boolean],
			default() {
				return this.$route.path;
			},
		},
		query: {
			type: Object,
		},
		total: {
			type: Number,
			default: 432,
		},
		count: {
			type: Number,
			default: 50,
		},
		value: {
			type: Number,
		},
		prevText: {
			type: String,
			default: 'назад',
		},
		nextText: {
			type: String,
			default: 'вперед'
		},
		etc: {
			type: String,
			default: '...',
		},
		align: {
			type: String,
			validator: value => ['right'].indexOf(value) !== -1,
		}
	},

	computed: {
		countPages() {
			return Math.ceil(this.total / this.count);
		},

		prevDisabled() {
			return this.value === 1;
		},

		prevValue() {
			const prev = this.value - 1;
			return prev <= 1 ? 1 : prev;
		},

		prev() {
			return {
				text: this.prevText,
				disabled: this.prevDisabled,
				value: this.prevValue,
				motion: true,
			};
		},

		nextDisabled() {
			return this.value === this.countPages;
		},

		nextValue() {
			const next = this.value + 1;
			return next >= this.countPages ? this.countPages : next;
		},

		next() {
			return {
				text: this.nextText,
				disabled: this.nextDisabled,
				value: this.nextValue,
				motion: true,
			};
		},

		items() {
			let paginates = [this.prev, ...this.getPaginates(), this.next];

			// Генерация href
			if (this.url !== false) {
				paginates = paginates.map(paginate => Object.assign({}, paginate, {
					href: this.generateLink(paginate.value),
				}));
			}

			return paginates;
		}
	},

	methods: {
		/**
		 * Алгоритм постройки чисел
		 * 1 2 3 ... 41 42 43
		 * 1 2 ... 6 ... 42 43
		 */
		getPaginates() {
			const current = this.value;
			const count = this.countPages;
			const paginates = [];

			// Максимальное количество когда нет точек
			const MAX_COUNT_WITHOUT_ETC = 8;
			if (count < MAX_COUNT_WITHOUT_ETC) {

				// Массив начиная с 1 до count
				// Тоесть [1, 2, 3, 4 ... count]
				const values = new Array(count).fill('').map((value, index) => index + 1);
				paginates.push(...this.getPaginateArray(values));
			} else {
				let start;
				let end;
				let center;

				// Если находмся в первых трех
				// Если находимся в последних трех
				if (current < 4 || count - 3 < current) {
					start = this.getPaginateArray([1, 2, 3]);
					end = this.getPaginateArray([count - 2, count - 1, count]);

					const centerValue = Math.ceil((count - 4) / 2 + 2);
					center = [this.getPaginate(centerValue, true)];

				} else {
					// Если находмся в середине
					start = this.getPaginateArray([1, 2]);
					end = this.getPaginateArray([count - 1, count]);
					center = [
						this.getPaginate(current - Math.ceil((current - 2) / 2), true),
						this.getPaginate(current),
						this.getPaginate(current + Math.ceil((count - 2 - current) / 2), true),
					];
				}

				paginates.push(...start, ...center, ...end);
			}

			return paginates;
		},

		getPaginateArray(array) {
			return array.map(value => this.getPaginate(value));
		},

		getPaginate(value, etc = false) {
			const text = etc ? this.etc : value;

			return {
				text,
				value,
			};
		},

		generateLink(page) {
			return this.$axios.getUri({
				url: this.url,
				params: { ...this.query, page },
			});
		},

		onClick(e, value) {
			this.$emit('input', value);
		},
	},
}
</script>

<style lang="scss">
.paginate {
	display: flex;
	align-items: center;
	list-style: none;
	margin: 0;
	padding: 0;

	li + li {
		margin-left: rem(8);
	}

	&--right {
		justify-content: flex-end;
	}
}

.paginate-item {
	min-width: rem(18);
	justify-content: center;

	&:not(.is-active) {
		opacity: 0.3;
	}

	&.is-active {
		pointer-events: none;
	}
}
</style>
