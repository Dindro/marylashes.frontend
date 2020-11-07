<template>
	<div class="record">
		<div class="record__control">
			<ul class="record__tabs">
				<template v-if="componentName !== componentNameResult">
					<nav-arrows :nav_arrows="arrows" @prev="selectTab(active - 1)" @next="selectTab(active + 1)"></nav-arrows>
					<li class="record__tab-wrapper" v-for="(tab, index) in tabs" :key="index">
						<button
							class="record__tab"
							:class="[ active === index && 'is-active', tab.disabled && 'is-disabled' ]"
							@click="selectTab(index)">
							{{ tab.title }}
						</button>
						<p class="record__choose">{{ tab.text }}</p>
					</li>
				</template>

				<li v-else class="record__tab-wrapper">
					<button class="record__tab record__tab--result" @click="selectTab(0)">{{ tabs[0].title }}</button>
				</li>
			</ul>
		</div>
		<div class="record__content" :class="[`record__content--${componentName}`]">
			<keep-alive>
				<component :is="componentName" @change="selectTab" @close="close"></component>
			</keep-alive>
		</div>
	</div>
</template>

<script>
import RecordService from './RecordService';
import RecordDate from './RecordDate';
import RecordContact from './RecordContact';
import RecordResult from './RecordResult';
import NavArrows from '+/NavArrows';

import { mapState, mapGetters } from 'vuex';

const COMPONENT_RECORD_RESULT = 'record-result';
const COMPONENTS = ['record-service', 'record-date', 'record-contact', COMPONENT_RECORD_RESULT];

export default {
	components: {
		RecordService,
		RecordDate,
		RecordContact,
		RecordResult,
		NavArrows,
	},

	data: () => ({
		componentNameResult: COMPONENT_RECORD_RESULT,
		componentName: COMPONENTS[0],
		active: 0,
	}),

	computed: {
		...mapState('record', {
			tabsText: state => state.text.tabs,
			selectedDate: 'selectedDate',
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
			const dateDisabled = !this.validate(0);
			const contactDisabled = dateDisabled || !this.validate(1)
			return [
				{
					title: services,
					text: this.selectedServicesText,
				},
				{
					title: date,
					text: this.selectedDateText,
					disabled: dateDisabled,
				},
				{
					title: contact,
					disabled: contactDisabled,
				}
			];
		},

		arrows() {
			return {
				color: 'dark',
				prevDisabled: this.active <= 0,
				nextDisabled: this.tabs.length <= this.active + 1 || this.valid === false,
			};
		},

		valid() {
			return !!this.validate(this.active);
		},
	},

	methods: {
		selectTab(index) {
			if (!COMPONENTS[index]) {
				process.env.NODE_ENV === 'development' && console.info('Record tabs: Not found components');
				return;
			}

			this.componentName = COMPONENTS[index];
			this.active = index;
		},

		validate(index) {
			switch (index) {
				case 0:
					if (this.selectedServices.length) return true;
					break;

				case 1:
					if (this.selectedDate) return true;
			}
		},

		close() {
			this.$parent.$emit('close');
		},
	}
}
</script>

<style lang="scss">
.record {
	$b: #{&};

	&__tabs {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;

		@include media-breakpoint-down(sm) {
			display: inline-flex;
			position: relative;
			align-items: center;
		}

		.nav-arrows {
			@include media-breakpoint-up(md) {
				display: none;
			}

			margin-left: rem(-$indent-arrows-sm);

			&__button {
				margin-top: rem(-$indent-arrows-sm);
				margin-bottom: rem(-$indent-arrows-sm);

				&--prev {
					margin-right: rem(4);
				}

				&--next {
					position: absolute;
					left: calc(100% + #{rem(4)});
				}
			}
		}
	}

	&__tab-wrapper {
		position: relative;

		& + & {
			margin-left: rem(24);

			@include media-breakpoint-down(sm) {
				margin-left: 0;
			}
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

		&.is-disabled {
			opacity: 0.15;
			pointer-events: none;
		}

		@include media-breakpoint-down(sm) {
			&:not(.is-active):not(&--result) {
				display: none;
			}
		}
	}

	&__choose {
		opacity: 0.65;
		text-transform: lowercase;
		position: absolute;
		white-space: nowrap;
		top: calc(100% + #{rem(4)});
		@include text-small;

		@include media-breakpoint-down(sm) {
			display: none;
		}
	}

	.record-service,
	.record-contact {
		margin-top: rem(64);

		@include media-breakpoint-down(sm) {
			margin-top: rem(32);
		}
	}

	.record-date {
		margin-top: rem(40);

		@include media-breakpoint-down(md) {
			margin-top: rem(48);
		}

		@include media-breakpoint-down(sm) {
			margin-top: rem(32);
		}
	}
}
</style>
