<script>
import statuses from '@/utils/statuses';

export default {
	abstract: true,

	props: {
		id: String,
		textClass: String,
	},

	methods: {
		getStatus(id) {
			if (id === undefined) return;

			return `is-status-${id}`;
		},

		async updateStatus(value, prev) {
			if (process.server) return;

			await this.$nextTick();

			// Если имеется предыдущее состояние
			if (prev) {
				const status = this.getStatus(prev);

				if (status) {
					this.$el.classList.remove(status);
				}
			}

			const status = this.getStatus(value);
			if (status) {
				this.$el.classList.add(status);
			}
		}
	},

	render(h) {
		try {
			const slot = this.$slots.default[0];
			return slot;
		} catch (err) {
			// Рендер по умолчанию обычный текст
			const text = statuses[this.id];
			return h('span', { class: `text-default ${this.textClass}` }, text);
		}
	},

	watch: {
		id: {
			handler: 'updateStatus',
			immediate: true,
		}
	}
}
</script>

<style lang="scss">
// Рендерим классы
@each $key, $value in $statuses {
	.is-status-#{$key} {
		color: $value;
	}
}
</style>
