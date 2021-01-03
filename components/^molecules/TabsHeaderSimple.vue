<template>
	<ul class="tabs-header">
		<li
			v-for="(item, i) in items"
			:key="i"
			:class="{ 'is-active': i === value }"
			class="tabs-header-item">
			<slot :item="item" :onClick="getOnClick(i)">
				<LinkAction :link="item" @click.native="onClick(i)"/>
			</slot>
		</li>
	</ul>
</template>

<script>
import LinkAction from '+/LinkAction';

export default {
	props: {
		items: Array,
		value: [String, Number],
	},

	methods: {
		getOnClick(index) {
			return this.onClick.bind(this, index);
		},

		onClick(index) {
			this.$emit('input', index);
		}
	}
}
</script>

<style lang="scss">
.tabs-header {
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
}

.tabs-header-item {
	@include defaultTransition(opacity);

	& + & {
		margin-left: rem(16);
	}

	&:not(.is-active) {
		opacity: 0.3;

		&:hover {
			opacity: 1;
		}
	}

	&.is-active {
		pointer-events: none;
	}
}
</style>
