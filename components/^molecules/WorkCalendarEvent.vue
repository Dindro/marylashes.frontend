<template>
	<div class="wc-event" :class="[ `wc-event--${size.event}`, status && `is-status-${status}` ]">
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
		status: '',
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
	background-color: rgba($color-dark, 0.2);
	border: 1px solid $color-dark;

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

	& + .vuecal__event-resize-handle {
		height: rem(6);
		border-bottom-left-radius: rem(2);
		border-bottom-right-radius: rem(2);
		left: 1px;
		right: 1px;
		bottom: 1px;
		border-top: 1px solid rgba($color-dark, 0.5);
		background-color: rgba($color-dark, 0.1);
	}

	@each $key, $value in $statuses {
		&.is-status-#{$key} {
			background-color: rgba($value, 0.2);
			border: 1px solid $value;

			& + .vuecal__event-resize-handle {
				border-top: 1px solid rgba($value, 0.5);
				background-color: rgba($value, 0.1);
			}
		}
	}
}

.wc-user {
	$b: #{&};

	display: flex;

	&__avatar {
		flex-shrink: 0;
		margin-right: rem(4);

		img:not([src])::after {
			background-color: $color-white;
		}
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
