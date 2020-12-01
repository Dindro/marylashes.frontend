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
					<action :action="review.action"></action>
					<action :action="review.action_preview" @click.native.prevent="showPreview"></action>
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
					"name": "POLITICS"
				}
			]
		}
	}),

	computed: {
		/**
		 * Поля могут содержать себе внутри полей
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

	methods: {
		inputField({ field, value }) {
			let fieldNative = field;
			let valueNative = value;

			if (field.group && typeof value === 'object') {
				fieldNative = field.fields[value.index];
				valueNative = value.value;
			}

			fieldNative.value = valueNative;
		},

		async showPreview() {
			// Проверка на валидность формы
			const success = await this.validateReviewFields();
			if (!success) return;

			const title = this.getValueByMap('title');
			const text = this.getValueByMap('text');
			const authorName = this.getValueByMap('name');
			const imagePath = this.getValueByMap('photo');

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
						src: imagePath,
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

			this.$modal.show(CardReview, componentProps);
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

		async onSubmit() {
			process.env.NODE_ENV === 'development' && console.info('Review Create form submit');

			// Проверка на валидность
			const success = await this.$refs.form.validate();
			if (!success) {
				// this.shakeAction();
				return;
			}
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
