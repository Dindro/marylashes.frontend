<template>
	<div class="card-meet" :class="[card.deletable && 'card-meet--deletable']">
		<p class="card-meet__views">{{ views }}</p>
		<p class="card-meet__date">{{ date }} {{ duration }}</p>
		<button class="card-meet__delete" v-if="card.deletable" @click="$emit('delete', card)">
			<icon-vue :icon="{ name: '24/cross', size: 16 }"></icon-vue>
		</button>
	</div>
</template>

<script>
import IconVue from '+/Icon';
import { formatDayMonthTime } from '~/utils/dates';

export default {
	components: {
		IconVue,
	},
	props: {
		card: {
			type: Object,
			required: true,
		}
	},
	computed: {
		views() {
			return this.card.views.join(' ');
		},

		date() {
			const date = new Date(+this.card.date);
			if (!isNaN(date.getTime())) return formatDayMonthTime(date);

			return this.card.date;
		},

		duration() {
			return `(${this.card.duration}ч)`;
		}
	}
}
</script>

<style lang="scss">
.card-meet {
	background-color: $color-light;
	border-radius: rem(2);
	padding: rem(16);
	text-transform: lowercase;
	white-space: nowrap;
	opacity: 0.65;
	user-select: none;

	@include text-small;

	&__date {
		margin-top: rem(4);
	}

	&__delete {
		display: inline-flex;
		background: transparent;
		border: none;
		padding: 0;
		margin: 0;
		position: absolute;
		top: rem(16);
		right: rem(16);
		opacity: 0.3;
		outline: none !important;

		@include defaultTransition(opacity);

		&:hover {
			opacity: 1;
		}
	}

	&--deletable {
		position: relative;
		user-select: initial;
		opacity: 1;
		padding-right: rem(16 * 2 + 16);
	}
}
</style>
