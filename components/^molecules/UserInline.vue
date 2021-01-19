<template>
	<div class="user-inline">
		<Avatar
			v-if="image !== false"
			class="user-inline__avatar"
			:image="image"
			size="default"/>
		<span class="user-inline__name">{{ name }}</span>
	</div>
</template>

<script>
import Avatar from '+/Avatar';

export default {
	components: {
		Avatar,
	},
	props: {
		image: {
			type: [String, Boolean],
			default: undefined,
		},
		name: String,
	}
}
</script>

<style lang="scss">
.user-inline {
	display: flex;

	&__avatar {
		flex-shrink: 0;
		margin-right: rem(8);
	}

	&__name {
		text-align: left;
		align-self: center;
		@include text-default;
	}
}
</style>
