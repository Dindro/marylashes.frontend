<template>
	<div class="record-service">
		<card-record-list class="record-service__services" :card_record_list="Object.assign({}, { items: services })" @select="selectService"></card-record-list>

		<client-only>
			<div v-show="price !== 0" class="record-service__price record-service-price">
				<p class="record-service-price__title">{{ text.price }}</p>
				<p class="record-service-price__price">{{ price }}₽</p>
				<div v-if="priceFootnotes.length" class="record-service-price__footnote">
					<p v-for="(footnote, index) in priceFootnotes" :key="index" class="record-service-price__footnote-item">*{{ footnote }}</p>
				</div>
			</div>
		</client-only>

		<client-only>
			<div class="record-service__meets" v-if="nextMeetsNormalize.items.length || prevMeetsNormalize.items.length">
				<card-meet-list v-if="nextMeetsNormalize.items.length" :card_meet_list="nextMeetsNormalize" class="record-service__meet"></card-meet-list>
				<card-meet-list v-if="prevMeetsNormalize.items.length" :card_meet_list="prevMeetsNormalize" class="record-service__meet"></card-meet-list>
			</div>
		</client-only>
	</div>
</template>

<script>
import CardRecordList from '&/CardRecordList';
import CardMeetList from '&/CardMeetList';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
	components: {
		CardRecordList,
		CardMeetList
	},

	computed: {
		...mapState('record', {
			text: state => state.text.services,
			services: 'services',
		}),

		...mapGetters('record', {
			price: 'PRICE',
			selectedServices: 'SELECTED_SERVICES',
			nextMeets: 'NEXT_MEETS',
			prevMeets: 'PREV_MEETS',
		}),

		priceFootnotes() {
			return this.selectedServices.filter(service => service.price_info).map(service => service.price_info);
		},

		prevMeetsNormalize() {
			const meets = this.prevMeets.map(meet => {
				const views = meet.views.map(view => this.getServiceTextById(view));
				return Object.assign({}, meet, { views });
			});

			return {
				items: meets,
				title: this.text.meets_prev,
			}
		},

		nextMeetsNormalize() {
			const meets = this.nextMeets.map(meet => {
				const views = meet.views.map(view => this.getServiceTextById(view));
				return Object.assign({}, meet, { views });
			});

			const items = meets.map(meet => Object.assign({}, meet, { deletable: true }));
			return {
				items,
				title: this.text.meets_next,
			}
		}
	},

	methods: {
		...mapActions('record', [
			'selectService',
		]),

		cancelMeet(meet) {

		},

		// Получить название по id
		getServiceTextById(id) {
			const service = this.services.find(service => service.view_id === id);
			if (!service) return;

			return service.title_selected || service.title;
		}
	},
}
</script>

<style lang="scss">
.record-service {
	@include media-breakpoint-down(sm) {
		display: flex;
		flex-direction: column;
	}

	&__meets {
		display: flex;
		flex-wrap: wrap;
		margin-left: rem(-24);
		margin-top: rem(40 - 16);

		@include media-breakpoint-down(sm) {
			order: 3;
		}
	}

	&__meet {
		margin-left: rem(24);
		margin-top: rem(16);
	}

	&__price {
		margin-top: rem(24);

		@include media-breakpoint-down(sm) {
			order: 1;
			margin-top: 0;
			margin-bottom: rem(24);
		}
	}

	&__services {
		@include media-breakpoint-down(sm) {
			order: 2;
		}
	}
}

.record-service-price {
	&__title {
		@include text-small;
		opacity: 0.65;
	}

	&__price {
		font-size: rem(36);
		line-height: 1.4;
	}

	&__footnote {
		@include text-small;
		opacity: 0.3;
		margin-top: rem(4);
		max-width: rem(340);
	}
}
</style>
