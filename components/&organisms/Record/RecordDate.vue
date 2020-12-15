<template>
	<div class="record-date">
		<week
			:timeFrom="timeFrom"
			:timeTo="timeTo"
			:meets="meets"
			:text="text"
			:duration="duration"
			:selectedDate="selectedDate"
			:loadMeets="loadMeets"
			@select="selectDate"
		>
			<template v-slot:footnote>
				<div class="record-date-action">
					<p class="record-date-action__separate">{{ text.or }}</p>
					<p class="record-date-action__text">{{ text.individual_text }}</p>
					<action @click.native="selectDateIndividual" class="record-date-action__action" :action="action"></action>
				</div>
			</template>
		</week>
	</div>
</template>

<script>
import Week from '=/Week/Week';
import Action from '+/Action';

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

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

		...mapMutations('record', {
			addMeets: 'ADD_MEETS',
		}),

		selectDateIndividual() {
			this.selectDate('INDIVIDUAL');
			this.$emit('change', 2);
		},

		async loadMeets(date) {
			const options = {
				date: (date instanceof Date) ? date.getTime() : date,	// Начало времени
				duration: 7,	// Кол-во дней
			};

			try {
				const res = await this.$provide.meet.get(options);
				this.addMeets(res.data);
			} catch (err) {
				// TODO: Обработка ошибок
				// TODO: Вывод в общую ошибку
				console.log(err);
			}
		},
	},
}
</script>

<style lang="scss">
.record-date {

}

.record-date-action {
	display: flex;
	align-items: center;

	@include media-breakpoint-only(md) {
		margin-top: rem(8);
		justify-content: flex-end;
	}

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

		@include media-breakpoint-down(sm) {
			font-size: rem(10);
			margin-top: rem(8);
		}
	}
}
</style>
