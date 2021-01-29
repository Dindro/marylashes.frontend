<script>
/**
 * Примерное реализаиця в
 * @see https://bootstrap-vue.org/docs/components/tabs
 */
import TabsHeaderSimple from '^/TabsHeaderSimple';

const ACTIVE_CLASS = 'is-active';

export default {
	components: {
		TabsHeaderSimple,
	},

	data: () => ({
		value: '',
	}),

	computed: {
		slots() {
			return this.$slots.default.filter(item => item.tag);
		},

		tabs() {
			return this.slots.map(item => item.data.attrs.title);
		},

		tabsNormalize() {
			return this.tabs.map(tab => Object.assign({}, { tag: 'button', text: tab }));
		},
	},

	created() {
		let activeIndex = this.slots.findIndex(item => typeof item.data.attrs['active'] === 'string');
		this.value = activeIndex === -1 ? 0 : activeIndex;
	},

	render(h) {
		const slots = this.slots.map((slot, index) => {
			return h(
				slot.tag,
				{ ...slot.data, class: { [ACTIVE_CLASS]: this.value === index }},
				slot.children);
		});

		return (
			<div class="tabs-simple">
				<div class="tabs-simple__header">
					<TabsHeaderSimple v-model={this.value} items={this.tabsNormalize}/>
				</div>

				<div class="tabs-simple__body">
					{slots}
				</div>
			</div>
		);
	},
}
</script>

<style lang="scss">
.tabs-simple {
	&__body {
		margin-top: rem(16);

		> *:not(.is-active) {
			display: none;
		}
	}
}
</style>
