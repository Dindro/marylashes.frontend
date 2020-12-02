<template>
	<div class="text-factoid">
		<h2 v-if="text_factoid.title" class="text-factoid__title">{{ text_factoid.title }}</h2>
		<div class="text-factoid__content">
			<div class="text-factoid__text" v-html="text_factoid.text"></div>
			<div class="text-factoid__factoid" v-if="text_factoid.factoid">
				<factoid :factoid="text_factoid.factoid"/>
			</div>
		</div>
		<div class="text-factoid__action" v-if="text_factoid.action">
			<action :action="text_factoid.action" @click.native="close"/>
		</div>
	</div>
</template>

<script>
import Factoid from '+/Factoid';
import Action from '+/Action';

export default {
	components: {
		Factoid,
		Action,
	},

	props: {
		text_factoid: {
			type: Object,
			required: true,
		}
	},

	methods: {
		close() {
			this.$emit('close');
		}
	},
}
</script>

<style lang="scss">
.text-factoid {
	&__title {
		@include h2;
		margin-bottom: rem(24);
	}

	&__content {
		display: flex;
		justify-content: flex-end;
	}

	&__text {
		flex: 1;
		@include text-default;
	}

	&__factoid {
		margin-left: rem(32);
	}

	&__actions {
		margin-top: rem(32);
	}
}
</style>
