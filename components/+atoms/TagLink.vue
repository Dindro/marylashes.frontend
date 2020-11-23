<template>
	<component :is="component.componentName" v-bind="component.params">
		<slot>{{ link.text }}</slot>
	</component>
</template>

<script>
export default {
	props: {
		link: {
			type: Object,
			required: true,
		},
		tag: {
			type: String,
		},
		activeTag: {		// тэг в случае если является активным
			type: String,
		},
	},

	computed: {
		component() {
			const { componentName, ...params } = this.getParams(this.link);

			return {
				componentName,
				params,
			}
		}
	},

	methods: {
		getParams(link) {
			const { href } = link;

			// Проверка на отсутсвтие ссылки
			if (!href) return {
				componentName: this.tag || 'span',
				type: this.tag === 'button' ? link.type : null,
			};

			if (typeof href === 'object') return {
				componentName: 'nuxt-link',
				to: href,
				target: link.target,
				rel: link.rel,
				title: link.title,
			};

			// Проверка на внешние ресурсы
			if (this.linkOnOtherResources(href)) return {
				componentName: 'a',
				href,
				target: link.target || '_blank',
				rel: link.rel || 'noopener',
				title: link.title,
			};

			// Проверка на tel: mailto:
			if (this.linkPhoneMail(href)) return {
				componentName: 'a',
				href,
				target: link.target,
				rel: link.rel,
				title: link.title,
			};

			// Проверка на текущую ссылку
			if (this.currentLink(href)) return {
				componentName: 'nuxt-link',
				tag: this.activeTag || this.tag || 'span',
				to: href,
				target: link.target,
				rel: link.rel,
				title: link.title,
			}

			return {
				componentName: 'nuxt-link',
				to: href,
				target: link.target,
				rel: link.rel,
				title: link.title,
			}
		},

		// Проверка ссылки на остальные ресурсы
		linkOnOtherResources(href) {
			const regOtherResourse = /^(http(s)?|ftp):\/\//;
			return href.match(regOtherResourse);
		},

		// Проверка ссылки на tel: и mailto:
		linkPhoneMail(href) {
			const regPhoneMail = /^(tel:|mailto:)/;
			return href.match(regPhoneMail);
		},

		// Проверка ссылки на текущую страницу
		currentLink(href) {
			let pagePath = this.$route.path.replace(/\/$/, '');
			return href.replace(/\/$/, '') === pagePath;
		},
	}
};
</script>
