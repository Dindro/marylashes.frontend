<template>
	<div class="review-create">
		<h2 class="review-create__title" v-text="review.title"></h2>
		<p v-if="review.text" class="review-create__text" v-html="review.text"></p>

		<validation-observer ref="form" slim>
			<form @submit.prevent="onSubmit" class="review-create__form">
				<div class="review-create__fields">
					<field
						class="review-create__field"
						v-for="(field, i) in review.fields"
						:key="i"
						v-bind="field"
						:class="[ field.grid_half && 'review-create__field--half' ]"
						@input="value => inputField({ field, value })"></field>
				</div>

				<div class="review-create__actions">
					<action :action="Object.assign({}, review.action, { shake: shakeSubmit, loading: loading })"></action>
					<action :action="Object.assign({}, review.action_preview, { shake: shakePreview })" @click.native.prevent="showPreview"></action>
				</div>
			</form>
		</validation-observer>
	</div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import Field from '+/Field';
import Action from '+/Action';
import CardReview from '^/CardReview';
import TextFactoid from '^/TextFactoid';

import fieldsStorage from '~/storage/fields';
import { getImageFromFile } from '~/utils/image';

export default {
	components: {
		Field,
		Action,
		ValidationObserver,
		CardReview
	},

	props: {
		// review: {
		// 	type: Object,
		// 	required: true,
		// }
	},

	data: () => ({
		shakeSubmit: false,
		shakePreview: false,
		loading: false,
		"review": {
			"title": "Оставить отзыв",
			"text": "Жду ваших отзывов.<br>После отправки отзыва, отзыв модерируется, после публикуется на сайте или в социальных сетях. Спасибо!",
			"action": {
				"type": "submit",
				"text": "Отправить отзыв",
				"color": "outline-dark"
			},
			"action_preview": {
				"text": "Быстрый просмотр",
				"icon": {
					"name": "16/link"
				}
			},
			"fields_map": {
				"title": "HEADLINE",
				"text": "TEXT",
				"name": "NAME",
				"image": "PHOTO",
				"vk": "SOCIAL_VK",
				"tt": "SOCIAL_TIKTOK",
				"in": "SOCIAL_INSTAGRAMM",
				"socials": ["vk", "tt", "in"],
				"review_fields": ["TEXT", "HEADLINE", "PHOTO", "NAME"]
			},
			"fields": [
				{
					"input": true,
					"label": "Заголовок*",
					"required": true,
					"name": "HEADLINE",
					"save": true,
					"value": ""
				},
				{
					"textarea": true,
					"label": "Текст*",
					"required": true,
					"name": "TEXT",
					"save": true,
					"value": ""
				},
				{
					"grid_half": true,
					"input": true,
					"label": "Имя и фамилия*",
					"required": true,
					"name": "NAME",
					"save": true,
					"value": ""
				},
				{
					"image": true,
					"multiple": false,
					"label": "Фото*",
					"placeholder": "Нажмите чтобы выбрать",
					"required": true,
					"maxSize": 3072,
					"name": "PHOTO",
					"value": ""
				},
				{
					"grid_half": true,
					"group": true,
					"label": "Ссылки на твои социальные сети",
					"fields": [
						{
							"input": true,
							"label": "Vk",
							"placeholder": "vk.com/",
							"name": "SOCIAL_VK",
							"save": true,
							"value": ""
						},
						{
							"input": true,
							"label": "In",
							"placeholder": "instagramm.com/",
							"name": "SOCIAL_INSTAGRAMM",
							"save": true,
							"value": ""
						},
						{
							"input": true,
							"label": "Tt",
							"placeholder": "tiktok.com/",
							"name": "SOCIAL_TIKTOK",
							"save": true,
							"value": ""
						}
					]
				},
				{
					"checkbox": true,
					"label": "Согласен на <a href='#'>политику обработки персональных данных</a>*",
					"required": true,
					"value": false,
					"name": "POLITICS"
				}
			]
		}
	}),

	computed: {
		/**
		 * Поля могут содержать себе внутри полей
		 * Возвращает массив полей
		 */
		fieldsInline() {
			const fields = [];

			this.review.fields.forEach(field => {
				if (field.group && field.fields) {
					fields.push(...field.fields);
				} else {
					fields.push(field);
				}
			});

			return fields;
		}
	},

	created() {
		if (process.client) {
			this.loadFields();
		}
	},

	methods: {
		inputField({ field, value }) {
			let fieldNative = field;
			let valueNative = value;

			if (field.group && typeof value === 'object') {
				fieldNative = field.fields[value.index];
				valueNative = value.value;
			}

			// Сохраняем в localStorage
			if (fieldNative.save)
				fieldsStorage.add(valueNative, 'REVIEW', fieldNative.name);

			fieldNative.value = valueNative;
		},

		async showPreview() {
			// Проверка на валидность формы
			const success = await this.validateReviewFields();
			if (!success) {
				this.shakeAction('shakePreview');
				return;
			};

			const title = this.getValueByMap('title');
			const text = this.getValueByMap('text');
			const authorName = this.getValueByMap('name');
			const image = this.getValueByMap('image');

			// Подготовка социальной сети автора
			let authorSocials = [];
			const socialsCode = this.review.fields_map.socials || ['vk', 'in', 'tt'];
			socialsCode.forEach(code => {
				const value = this.getValueByMap(code);
				if (value) {
					authorSocials.push({
						href: value,
						text: code[0].toUpperCase() + code.slice(1) // Делаем первую букву заглавное vk => Vk
					});
				}
			});

			const componentProps = {
				card: {
					type: false,
					image: {
						src: await getImageFromFile(image),
						alt: "User image",
					},
					title,
					text,
					author: {
						inline: false,
						name: authorName,
						socials: authorSocials && authorSocials.length ? { items: authorSocials } : false,
					},
				},
			};

			process.env.NODE_ENV === 'development' && console.info('Review card', componentProps.card);

			const modalOptions = {
				size: 'space-around',
				indent: 'equal-action',
			};
			this.$modal.show(CardReview, componentProps, modalOptions);
		},

		// Загружаем филды из localStorage
		loadFields() {
			for (const field of this.fieldsInline) {
				if (field.save) {
					const value = fieldsStorage.get('REVIEW', field.name);
					if (value) field.value = value;
				}
			}
		},

		// Удаляем филды из localStorage
		resetFields() {
			fieldsStorage.removeGroup('REVIEW');
		},

		/**
		 * Проверка некоторых полей только для составления карточки отзыва
		 */
		async validateReviewFields() {
			const { form } = this.$refs;
			const fieldsName = this.review.fields_map.review_fields || ['TEXT', 'HEADLINE', 'PHOTO', 'NAME'];

			const validationResults = fieldsName
				.map(name => {
					const field = form.refs[name];
					if (!field) return;

					return field.validate();
				})
				.filter(validate => validate);

			const results = await Promise.all(validationResults);
			return results.every(result => result.valid);
		},

		getValueByMap(name) {
			// Получаем название поля
			const fieldName = this.review.fields_map[name];
			if (!fieldName) return;

			// Находим объект поля
			const field = this.fieldsInline.find(f => f.name === fieldName);
			if (!field) return;

			// Получаем его название
			return field.value;
		},

		shakeAction(name) {
			clearTimeout(this[name]);
			this[name] = setTimeout(() => this[name] = false, 350);
		},

		async onSubmit() {
			process.env.NODE_ENV === 'development' && console.info('Review Create form submit');

			// Проверка на валидность
			const success = await this.$refs.form.validate();
			if (!success) {
				this.shakeAction('shakeSubmit');
				return;
			}

			// Подготавливаем данные для отправки
			const fields = this.getFieldsValue(this.review.fields);
			const data = new FormData();
			for (const key in fields) {
				data.append(key, fields[key]);
			}

			// Вставим в ожидание
			this.loading = true;

			// Добавляем отзыв на сервер
			this.$provide.review.add(data)
				.then(res => {
					const { data } = res;

					// Закрываем текущую модалку
					this.$emit('close');

					// Обнуляем поля
					this.resetFields();

					// Открываем модалку об успешной операции
					this.openSuccessMessage(data);
				})
				.catch(err => {
					console.log('Error create review', err);
				})
				.finally(() => this.loading = false);
		},

		getFieldsValue(fields) {
			let result = {};

			for (const field of fields) {
				if (field.group && field.fields && field.fields.length) {
					const values = this.getFieldsValue(field.fields);
					result = Object.assign({}, result, values);
				} else {
					if (field.value !== '') {
						result[field.name] = field.value;
					}
				}
			}

			return result;
		},

		openSuccessMessage(data) {
			// Подготавливаем данные
			const modalOptions = {
				size: 'sm',
				indent: 'equal',
				closeButton: false,
			};

			this.$modal.show(TextFactoid, { text_factoid: data }, modalOptions);
		}
	}
}
</script>

<style lang="scss">
.review-create {
	&__title {
		@include h2;
	}

	&__text {
		margin-top: rem(24);
		max-width: rem(448);
		@include text-default;
	}

	&__form {
		margin-top: rem(56);
	}

	&__actions {
		margin-top: rem(48);
		display: flex;
		justify-content: space-between;
		align-items: center;

		@include media-breakpoint-down(sm) {
			flex-direction: column-reverse;
			align-items: flex-start;

			& > * + * {
				margin-bottom: rem(24);
			}
		}
	}

	&__fields {
		margin: rem(-16) 0;

		@include media-breakpoint-down(sm) {
			margin: rem(-12) 0;
		}
	}

	&__field {
		padding: rem(16) 0;

		@include media-breakpoint-down(sm) {
			padding: rem(12) 0;
		}

		&--half {
			@include media-breakpoint-up(md) {
				width: 50%;
			}
		}
	}
}
</style>
