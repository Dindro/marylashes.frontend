<template>
	<div class="record-date">
		<week
			:timeFrom="timeFrom"
			:timeTo="timeTo"
			:meets="meets"
			:text="text"
			:duration="duration"
			:selectedDate="selectedDate"
			@select="selectDate"
		>
			<template v-slot:footnote>
				<div class="record-date-action">
					<p class="record-date-action__separate">{{ text.or }}</p>
					<p class="record-date-action__text">{{ text.individual_text }}</p>
					<action @click.native="selectDate('INDIVIDUAL')" class="record-date-action__action" :action="action"></action>
				</div>
			</template>
		</week>
	</div>
</template>

<script>
import Week from '&/Week/Week';
import Action from '+/Action';

import { mapState, mapGetters, mapActions } from 'vuex';

export default {
	components: {
		Week,
		Action,
	},

	data: () => ({
		timeFrom: 10,
		timeTo: 18,
	}),

	computed: {
		...mapState('record', {
			text: state => state.text.date,
			meets: 'meets',
			selectedDate: 'selectedDate',
		}),

		...mapGetters('record', {
			duration: 'DURATION',
		}),

		action() {
			return {
				text: this.text.individual_action,
				small: true,
				icon: {
					name: '16/link'
				}
			}
		},
	},

	methods: {
		...mapActions('record', {
			selectDate: 'selectDate',
		}),
	},
}
</script>

<style lang="scss">
.record-date {

}

.record-date-action {
	display: flex;
	align-items: center;

	@include media-breakpoint-down(sm) {
		display: block;
		text-align: center;
	}

	&__text,
	&__separate {
		@include text-small;
	}

	&__text {
		margin-right: rem(8);
		opacity: 0.3;

		@include media-breakpoint-down(sm) {
			display: none;
		}
	}

	&__separate {
		opacity: 0.3;
		margin: rem(4) 0;

		@include media-breakpoint-up(md) {
			display: none;
		}
	}
}
</style>
