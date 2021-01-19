<template>
	<div class="wc-event" :class="[ `wc-event--${size.event}`, `is-status-${status}` ]">
		<div class="wc-event__user wc-user" :class="[ `wc-user--${size.event}` ]">
			<Avatar
				:size="size.avatar"
				class="wc-user__avatar"/>
			<span class="wc-user__name">Мария Ижуткина</span>
		</div>

		<div class="wc-event__info">
			<div class="wc-event__item">14:00 2ч</div>
			<div class="wc-event__item">Вывод</div>
			<div class="wc-event__item">Работа</div>
		</div>
	</div>
</template>

<script>
import Avatar from '+/Avatar';

export default {
	components: {
		Avatar,
	},

	data: () => ({
		mode: 'default',
		status: 'correct',
	}),

	computed: {
		size() {
			return this.getSize(this.mode);
		}
	},

	methods: {
		getSize(mode) {
			let size;

			switch (mode) {
				case 'small':
					size = {
						event: mode,
						avatar: 'xs'
					};
					break;

				default:
					size = {
						event: mode,
						avatar: 'sm'
					};
					break;
			}

			return size;
		}
	}
}
</script>

<style lang="scss">
.wc-event {
	display: flex;
	flex-direction: column;
	border-radius: rem(2);
	height: 100%;
	padding: rem(4);
	color: $color-dark;
	overflow: hidden;

	@include text-small;

	&__info {
		display: flex;
		flex-direction: column-reverse;
		margin-top: auto;
		overflow-y: auto;

		&::-webkit-scrollbar {
			-webkit-appearance: none;
			width: 0px;
		}
	}

	&__item {
		text-align: left;
	}

	&--small {
		padding-top: rem(2);
		padding-bottom: rem(2);
	}

	@each $key, $value in $statuses {
		&.is-status-#{$key} {
			background-color: rgba($value, 0.2);
			border: 1px solid $value;
		}
	}
}

.wc-user {
	$b: #{&};

	display: flex;

	&__avatar {
		flex-shrink: 0;
		margin-right: rem(4);
	}

	&__name {
		text-align: left;
		align-self: center;
		@include line-clamp(0.8125rem, 1.4, 2);
	}

	&--small {
		#{$b}__name {
			white-space: nowrap;
		}
	}
}
</style>
