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

	data: (ctx) => ({
		componentName: ctx.getComponentName(ctx.action),
		params: ctx.getParams(ctx.action),
	}),

	methods: {
		getComponentName({ type, icon }) {
			if (type === 'button') return 'btn';
			return 'link-action';
		},

		getParams(action) {
			const name = this.getComponentName(action);
			switch (name) {
				case 'btn':
					return { button: action }
					break;

				case 'link-action':
				default:
					return { link: action }
					break;
			}
		}
	}
}
</script>
