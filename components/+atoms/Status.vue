<script>
export default {
	abstract: true,

	props: {
		status: {
			type: Object,
			required: true,
		}
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
			const { text } = this.status;
			return h('span', { class: 'text-default' }, text);
		}
	},

	watch: {
		'status.id': {
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
