<template>
	<ul class="tabs-header" :class="[ multiple && 'tabs-header--multiple' ]">
		<li v-if="title" class="tabs-header__title">{{ title }}</li>
		<li
			v-for="(item, i) in items"
			:key="i"
			:class="{ 'is-active': isActive(i) }"
			class="tabs-header__item">
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
		title: String,
		items: Array,
		value: [String, Number, Array],
		multiple: Boolean,
	},

	methods: {
		getOnClick(index) {
			return this.onClick.bind(this, index);
		},

		getValue(index) {
			let value;

			if (this.multiple) {
				const isFind = this.value.includes(index);

				if (isFind) {
					value = this.value.filter(item => item !== index);
				} else {
					value = [...this.value, index];
				}
			} else {
				value = index;
			}

			return value;
		},

		isActive(index) {
			if (this.multiple) {
				return this.value.includes(index);
			} else {
				return index === this.value;
			}
		},

		onClick(index) {
			const value = this.getValue(index);
			this.$emit('input', value);
		}
	}
}
</script>

<style lang="scss">
.tabs-header {
	$b: #{&};

	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;

	&__title {
		@include text-default;
		opacity: 0.3;
		margin-right: rem(16);
	}

	&__item {
		user-select: none;
		@include defaultTransition(opacity);

		& + & {
			margin-left: rem(16);
		}

		&:not(.is-active) {
			opacity: 0.3;

			&:hover {
				opacity: 0.3;
			}
		}
	}

	&:not(#{$b}--multiple) {
		#{$b}__item.is-active {
			pointer-events: none;
		}
	}
}
</style>
