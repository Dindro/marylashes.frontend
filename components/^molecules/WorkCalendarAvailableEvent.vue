<template>
	<WorkCalendarEvent
		v-bind="$attrs"
		v-on="$listeners"
		ref="event"
		class="wc-available-event">
		<template #default="{ time, duration }">
			<div class="wc-available-event__header">
				<button class="wc-available-event-delete" type="button" @click="onDeleteClick">
					<IconVue :icon="{ name: '16/cross' }"/>
				</button>
			</div>
			<div class="wc-available-event__body">{{ text }}</div>
			<div class="wc-available-event__info">{{ time }} {{ duration }}ч</div>
		</template>
	</WorkCalendarEvent>
</template>

<script>
import WorkCalendarEvent from '^/WorkCalendarEvent';
import IconVue from '+/Icon';

export default {
	components: {
		WorkCalendarEvent,
		IconVue,
	},

	inheritAttrs: false,

	props: {
		text: {
			type: String,
			default: 'Свободные дни',
		},
	},

	methods: {
		onDeleteClick() {
			const id = null;
			this.$emit('delete', id);
		}
	}
}
</script>

<style lang="scss">
.wc-available-event {
	$b: #{&};

	text-align: left;
	display: flex;
	flex-direction: column;
	border-color: $color-green !important;
	background-color: rgba($color-green, 0.15) !important;

	& + .vuecal__event-resize-handle {
		border-top-color: rgba($color-green, 0.5);
		background-color: rgba($color-green, 0.1);
	}

	&__body {
		flex: 1 1 auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__header {
		text-align: right;
		line-height: 0;
	}

	&.wc-event--small {
		flex-direction: row-reverse;

		#{$b}__info {
			flex: 1 1 auto;
		}

		#{$b}__body {
			display: none;
		}
	}
}

.wc-available-event-delete {
	margin: rem(-2);
	padding: rem(2);
	border: none;
	border-radius: 0;
	background: none;
	display: inline-flex;
	color: $color-dark;
}
</style>
