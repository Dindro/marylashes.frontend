<template>
  <component :is="componentName" v-bind="params"></component>
</template>

<script>
import Btn from '+/Button';
import LinkAction from '+/LinkAction';

export default {
	components: {
		Btn,
		LinkAction,
	},

	props: {
		action: {
			type: Object,
			required: true,
		}
	},

	computed: {
		componentName() {
			if (this.action.type === 'button' || this.action.type === 'submit') return 'btn';
			return 'link-action';
		},

		params() {
			switch (this.componentName) {
				case 'btn':
					return { button: this.action }
					break;

				case 'link-action':
				default:
					return { link: this.action }
					break;
			}
		}
	}
}
</script>
