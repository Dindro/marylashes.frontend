<template>
	<div class="record">
		<div class="record__control">
			<ul class="record__tabs">
				<li class="record__tab-wrapper" v-for="(tab, index) in tabs" :key="index">
					<button class="record__tab" :class="{ 'is-active': active === index }" @click="selectTab(index)">{{ tab.title }}</button>
					<p class="record__choose record-choose">{{ tab.text }}</p>
				</li>
			</ul>
		</div>
		<div class="record__content" :class="[`record__content--${componentName}`]">
			<component :is="componentName" @change="selectTab"></component>
		</div>
	</div>
</template>

<script>
import RecordService from '&/RecordService';
import RecordDate from '&/RecordDate';
import RecordContact from '&/RecordContact';

import { mapState, mapGetters } from 'vuex';

const COMPONENTS = ['record-service', 'record-date', 'record-contact'];

export default {
	components: {
		RecordService,
		RecordDate,
		RecordContact,
	},

	data: () => ({
		componentName: COMPONENTS[0],
		active: 0,
	}),

	computed: {
		...mapState('record', {
			tabsText: state => state.text.tabs,
		}),

		...mapGetters('record', {
			selectedServices: 'SELECTED_SERVICES',
			selectedDateText: 'SELECTED_DATE_TEXT',
		}),

		selectedServicesText() {
			const texts = this.selectedServices.map(service => service.title_selected || service.title);
			return texts.join(' — ');
		},

		tabs() {
			const { services, date, contact } = this.tabsText;
			return [
				{
					title: services,
					text: this.selectedServicesText
				},
				{
					title: date,
					text: this.selectedDateText
				},
				{
					title: contact,
				}
			];
		}
	},

	methods: {
		selectTab(index) {
			if (!COMPONENTS[index]) {
				process.env.NODE_ENV === 'development' && console.info('Record tabs: Not found components');
				return;
			}

			this.componentName = COMPONENTS[index];
			this.active = index;
		}
	}
}
</script>

<style lang="scss">
.record {
	&__tabs {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	&__tab-wrapper {
		position: relative;

		& + & {
			margin-left: rem(24);
		}
	}

	&__tab {
		border: none;
		background: none;
		padding: 0;
		opacity: 0.3;
		outline: none !important;
		@include text-tab;
		@include defaultTransition(opacity);

		&.is-active,
		&:hover {
			opacity: 1;
		}
	}

	&__choose {
		@include text-small;
		opacity: 0.65;
		text-transform: lowercase;
		position: absolute;
		white-space: nowrap;
		top: calc(100% + #{rem(4)});
	}

	.record-service,
	.record-contact {
		margin-top: rem(64);
	}
}
</style>
