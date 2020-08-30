<template>
	<div class="actions" :class="{ 'actions--column': actions.column }">
		<action
			class="actions__item"
			v-for="(item, index) in actions.items"
			:key="index"
			:action="item"
		>
		</action>
	</div>
</template>

<script>
import Action from '+/Action';

export default {
    components: {
	  	Action,
    },

    props: {
		actions: {
			type: Object,
			required: true,
		}
    },
}
</script>

<style lang="scss">
.actions {
	display: flex;
	flex-wrap: wrap;
	margin: rem(-16) 0 0 rem(-24);

	@include media-breakpoint-down(sm) {
		margin-top: rem(-8);
	}

	&__item {
		margin: rem(16) 0 0 rem(24);

		@include media-breakpoint-down(sm) {
			margin-top: rem(8);
		}
	}

	&--column {
		flex-direction: column;
		align-items: flex-start;
	}
}
</style>
