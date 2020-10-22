<template>
	<div class="record-result">
		<h2 class="record-result__title">{{ result.title }}</h2>
		<p class="record-result__text text-default" v-html="result.text"></p>
		<action class="record-result__action" :action="result.action" @click="close"></action>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Action from '+/Action';

export default {
	components: {
		Action,
	},

	computed: {
		...mapState('record', {
			result: 'result'
		}),
	},

	methods: {
		close() {
			this.$emit('modal:close');
		}
	},
}
</script>

<style lang="scss">
.record-result {
	min-height: rem(600);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	&__title {
		@include h2;
		margin-bottom: rem(8);
	}

	&__text {
		text-align: center;
	}

	&__action {
		margin-top: rem(40);
	}
}
</style>
