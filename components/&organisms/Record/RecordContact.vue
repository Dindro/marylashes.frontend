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

		<validation-observer ref="form" slim>
			<form @submit.prevent="onSubmit" class="record-form record-contact__form">
				<div class="record-form__contact record-form-grid">
					<field class="record-form-grid__item" v-for="(field, i) in contacts.info" :key="i" v-bind="field" @input="value => inputField({ field, value })"></field>
				</div>
				<div class="record-form__socials record-form-grid">
					<p class="record-form-grid__title text-default">{{ text.socials_header }}</p>
					<field class="record-form-grid__item" v-for="(field, i) in contacts.socials" :key="i" v-bind="field" @input="value => inputField({ field, value })"></field>
				</div>
				<div class="record-form__checkboxes record-form-grid record-form-grid--sm">
					<field class="record-form-grid__item record-form-grid__item--lg" v-for="(field, i) in contacts.checkboxes" :key="i" v-bind="field" @input="value => inputField({ field, value })"></field>
				</div>
				<div class="record-form__action">
					<action :action="action"></action>
				</div>
			</form>
		</validation-observer>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { getTime } from '~/utils/dates';
import meetsStorage from '@/storage/meets';
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
		shake: false,
		editIcon: {
			name: '16/edit',
			size: 24,
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
			selectedServicesId: 'SELECTED_SERVICES_ID',
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
		},

		action() {
			return Object.assign({}, this.contacts.action, {
				type: 'submit',
				loading: this.loading,
				fit_sm: true,
				shake: this.shake,
			});
		},
	},

	methods: {
		...mapMutations('record', {
			setResult: 'SET_RESULT',
		}),

		...mapActions('record', {
			inputField: 'setContactsField',
			resetSelectedData: 'resetSelectedData',
		}),

		shakeAction() {
			clearTimeout(this.shake);
			this.shake = setTimeout(() => this.shake = false, 350);
		},

		async onSubmit() {
			process.env.NODE_ENV === 'development' && console.info('Record form submit');

			// Проверка на валидность
			const success = await this.$refs.form.validate();
			if (!success) {
				this.shakeAction();
				return;
			}

			this.loading = true;

			// Получаем данные
			const form = this.createForm();

			// Получаем результат
			this.$provide.meet.add(form)
				.then(res => {
					// Получаем id записи и полезные данные
					const { id, ...result } = res.data;

					// Сохраняем id в localStorage
					meetsStorage.add({
						id,
						price: this.price,
						views: this.selectedServicesId,
						date: (this.selectedDateNative instanceof Date) ? this.selectedDateNative.getTime() : this.selectedDateNative,
						duration: this.duration,
					});

					// Записываем данные для сообщения
					this.setResult(result);

					// Переключаемся на сообщения (view)
					this.$emit('change', 3);

					// Выбранные значения ставим на дефолт
					this.resetSelectedData();
				})
				.catch(err => {
					// TODO: Добавить обработку ошибки
					console.log('Добавить встречу', err);
				})
				.finally(() => this.loading = false);
		},

		createForm() {
			const fields = [
				...this.contacts.info,
				...this.contacts.socials,
				...this.contacts.checkboxes,
			].map(({ name, value }) => ({ name, value }));

			const date = (this.selectedDateNative instanceof Date) ? this.selectedDateNative.getTime() : this.selectedDateNative;
			const services = this.selectedServicesId;

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
	@include media-breakpoint-up(lg) {
		display: flex;
		flex-direction: row-reverse;
		align-items: flex-start;
		justify-content: space-between;
	}

	&__check {
		width: auto;
	}

	&__form {
		padding-right: rem(48);
		width: 60%;

		@include media-breakpoint-down(md) {
			width: auto;
			padding-right: 0;
			margin-top: rem(64);
		}

		@include media-breakpoint-down(sm) {
			margin-top: rem(40);
		}
	}

	&--loading {
		pointer-events: none !important;
	}
}

.record-form {
	&__action {
		margin-top: rem(40);

		@include media-breakpoint-down(sm) {
			margin-top: rem(32);
		}
	}
}

.record-form-grid {
	$b: #{&};
	margin: rem(-16);
	display: flex;
	flex-wrap: wrap;

	@include media-breakpoint-down(sm) {
		margin: rem(-12);
	}

	&--sm {
		margin: rem(-8);

		#{$b}__item {
			padding: rem(8);
		}
	}

	& + & {
		padding-top: rem(32);

		@include media-breakpoint-down(sm) {
			padding-top: rem(24);
		}
	}

	&__title {
		width: 100%;
		padding: rem(16) rem(16) 0 rem(16);

		@include media-breakpoint-down(sm) {
			padding: rem(12) rem(12) 0 rem(12);
		}
	}

	&__item {
		width: 50%;
		padding: rem(16);

		@include media-breakpoint-down(sm) {
			width: 100%;
			padding: rem(12);
		}

		&--lg {
			width: 100%;
		}
	}
}

.record-contact-check {
	display: inline-block;
	background-color: $color-light;
	border-radius: rem(2);
	padding: rem(24);
	@include text-default;

	@include media-breakpoint-down(sm) {
		padding: rem(16);
		@include text-small;
	}

	&__title {
		opacity: 0.65;
	}

	&__text {
		text-transform: lowercase;
	}

	&__price {
		margin-top: rem(24);

		@include media-breakpoint-down(sm) {
			margin-top: rem(16);
		}
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
			vertical-align: top;

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

		@include media-breakpoint-down(sm) {
			padding-left: rem(8) !important;
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

		@include media-breakpoint-down(sm) {
			font-size: rem(32);
		}
	}
}
</style>
