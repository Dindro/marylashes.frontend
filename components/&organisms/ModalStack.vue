<template>
	<div class="modal-stack">
		<modal
			v-for="modal in modals"
			:key="modal.id"
			v-bind="modal.modalProps"
			v-on="modal.modalListeners"
			@closed="remove(modal.id)">

			<component
				:is="modal.component"
				v-bind="modal.componentProps"
				@close="$modal.hide(modal.modalProps.name)"/>
		</modal>
	</div>
</template>

<script>
import Modal from '&/Modal';
import SpinnerBlock from '&/SpinnerBlock';

const NAME_CLASS = 'modal--name--';

export default {
	components: {
		Modal,
	},

	data: () => ({
		modals: []
	}),

	created() {
		this.$root.modalStack = this;
	},

	methods: {
		async add(component, componentProps = {}, modalProps = {}, modalListeners = {}) {

			// Если компонент функция, значит динамический компонент
			if (typeof component === 'function') {
				const getDynamicComponent = component;
				component = () => ({
					component: getDynamicComponent(),
					loading: SpinnerBlock,
				});
			}

			const id = Date.now();
			const name = modalProps.name || NAME_CLASS + id;

			this.modals.push({
				id,
				component,
				componentProps,
				modalProps: { ...modalProps, name },
				modalListeners,
			});

			await this.$nextTick();
			this.$modal.show(name);

			return name;
		},

		remove(id) {
			const index = this.modals.findIndex(m => m.id === id);
			index !== -1 && this.modals.splice(index, 1);
		}
	},
}
</script>
