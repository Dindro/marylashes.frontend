<template>
	<div class="record-contact" :class="[ loading && 'record-contact--loading' ]">
		<div class="record-contact__check record-contact-check">
			<table class="record-contact-check__items">
				<tr>
					<td class="record-contact-check__title">{{ text.choose }}</td>
					<td class="record-contact-check__text">{{ selectedServicesText }}</td>
					<td class="record-contact-check__action">
						<button class="record-contact-check__button" @click="$emit('change', 0)">
							<icon-vue :icon="editIcon"></icon-vue>
						</button>
					</td>
				</tr>
				<tr>
					<td class="record-contact-check__title">{{ text.time }}</td>
					<td class="record-contact-check__text">{{ selectedDateText }}</td>
					<td class="record-contact-check__action">
						<button class="record-contact-check__button" @click="$emit('change', 1)">
							<icon-vue :icon="editIcon"></icon-vue>
						</button>
					</td>
				</tr>
			</table>

			<p class="record-contact-check__price record-contact-check-price">
				<span class="record-contact-check-price__text">{{ text.price }}</span>
				<span class="record-contact-check-price__price">{{ price }}₽</span>
			</p>
		</div>

		<validation-observer v-slot="{ handleSubmit }" ref="form" tag="div" slim>
			<form @submit.prevent="handleSubmit(onSubmit)" class="record-form record-contact__form">
				<div class="record-form__contact record-form-grid">
					<field class="record-form-grid__item" v-for="(field, i) in contacts.info" :key="i" v-bind="field" @input="value => inputField({ field, value })"></field>
				</div>
				<div class="record-form__socials record-form-grid">
					<p class="record-form-grid__title">{{ text.socials_header }}</p>
					<field class="record-form-grid__item" v-for="(field, i) in contacts.socials" :key="i" v-bind="field" @input="value => inputField({ field, value })"></field>
				</div>
				<div class="record-form__checkboxes record-form-grid record-form-grid--sm">
					<field class="record-form-grid__item record-form-grid__item--lg" v-for="(field, i) in contacts.checkboxes" :key="i" v-bind="field" @input="value => inputField({ field, value })"></field>
				</div>
				<div class="record-form__action">
					<action :action="Object.assign({}, contacts.action, { type: 'submit', loading })"></action>
				</div>
			</form>
		</validation-observer>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { getTime } from '~/utils/dates';
import { ValidationObserver } from 'vee-validate';
import IconVue from '+/Icon';
import FieldInput from '+/FieldInput';
import Field from '+/Field';
import Action from '+/Action';

export default {
	components: {
		IconVue,
		FieldInput,
		Field,
		Action,
		ValidationObserver,
	},

	data: () => ({
		loading: false,
		editIcon: {
			name: '24/edit',
		},
	}),

	computed: {
		...mapState('record', {
			text: state => state.text.contacts,
			contacts: 'contacts',
			selectedDateNative: 'selectedDate',
		}),

		...mapGetters('record', {
			selectedServices: 'SELECTED_SERVICES',
			selectedDate: 'SELECTED_DATE_TEXT',
			duration: 'DURATION',
			price: 'PRICE',
		}),

		selectedServicesText() {
			const texts = this.selectedServices.map(service => service.title_selected || service.title);
			return texts.join(' ');
		},

		selectedDateText() {
			const duration = this.duration ? ` (${this.duration}ч)` : '';
			return `${this.selectedDate}${duration}`;
		}
	},

	methods: {
		...mapActions('record', {
			inputField: 'setContactsField',
		}),

		onSubmit() {
			process.env.NODE_ENV === 'development' && console.info('Record form submit');

			this.loading = true;

			// Получаем данные
			const form = this.createForm();

			// Получаем результат
			this.$provide.meet.add(form)
				.then(res => {
					console.log(res);
				})
				.catch(err => console.log(err))
				.finally(() => this.loading = false);
		},

		createForm() {
			const fields = [
				...this.contacts.info,
				...this.contacts.socials,
				...this.contacts.checkboxes,
			].map(({ name, value }) => ({ name, value }));

			const date = (this.selectedDateNative instanceof Date) ? this.selectedDateNative.getTime() : this.selectedDateNative;
			const services = this.selectedServices.map(service => service.view_id);

			return {
				fields,
				date,
				services,
			};
		},
	},
}
</script>

<style lang="scss">
.record-contact {
	display: flex;
	flex-direction: row-reverse;
	align-items: flex-start;
	justify-content: space-between;

	&__check {
		width: auto;
	}

	&__form {
		padding-right: rem(48);
		width: 60%;
	}

	&--loading {
		pointer-events: none !important;
	}
}

.record-contact-check {
	display: inline-block;
	background-color: $color-light;
	border-radius: rem(2);
	padding: rem(24);
	@include text-default;

	&__title {
		opacity: 0.65;
	}

	&__text {
		text-transform: lowercase;
	}

	&__price {
		margin-top: rem(24);
	}

	&__button {
		outline: none !important;
		padding: 0;
		margin: 0;
		border: none;
		background: none;
		opacity: 0.3;
		@include defaultTransition(opacity);

		&:hover {
			opacity: 1;
		}
	}

	&__items {
		td {
			padding: rem(4);

			&:last-child {
				padding-right: 0;
			}

			&:first-child {
				padding-left: 0;
			}
		}
	}

	&__action {
		padding: 0 0 0 rem(16) !important;
	}
}

.record-form {
	&__action {
		margin-top: rem(40);
	}
}

.record-form-grid {
	$b: #{&};
	margin: rem(-16);
	display: flex;
	flex-wrap: wrap;

	&--sm {
		margin: rem(-8);

		#{$b}__item {
			padding: rem(8);
		}
	}

	& + & {
		padding-top: rem(32);
	}

	&__title {
		width: 100%;
		padding: rem(16) rem(16) 0 rem(16);
	}

	&__item {
		width: 50%;
		padding: rem(16);

		&--lg {
			width: 100%;
		}
	}
}

.record-contact-check-price {
	display: flex;
	justify-content: flex-end;
	align-items: baseline;

	&__text {
		opacity: 0.65;
	}

	&__price {
		font-size: rem(36);
		line-height: 1;
		font-weight: 600;
		margin-left: rem(8);
	}
}
</style>
