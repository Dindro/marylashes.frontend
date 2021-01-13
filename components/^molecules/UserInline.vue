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
		image: [String, Boolean],
		name: String,
	}
}
</script>

<style lang="scss">
.user-inline {
	display: flex;
	align-items: center;

	&__avatar {
		flex-shrink: 0;
		margin-right: rem(8);
	}

	&__name {
		@include text-default;
	}
}
</style>
