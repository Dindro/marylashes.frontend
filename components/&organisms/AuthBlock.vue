<template>
	<div class="auth">
		<div class="auth__form">
			<ValidationObserver ref="form" slim>
				<div class="auth-form">
					<form @submit.prevent="onSubmit">
						<div class="auth-form__header">
							<h1 class="auth-form__title">{{ auth.title }}</h1>
						</div>

						<div class="auth-form__content">
							<Field class="auth-form__field" v-bind="auth.login" v-model="login"/>
							<Field class="auth-form__field" v-bind="auth.password" v-model="password"/>
						</div>

						<div class="auth-form__footer">
							<Btn :button="action"/>
						</div>
					</form>
				</div>
			</ValidationObserver>
		</div>
	</div>
</template>

<script>
import Field from '+/Field';
import Btn from '+/Button';
import { ValidationObserver } from 'vee-validate';

export default {
	components: {
		Field,
		ValidationObserver,
		Btn,
	},

	props: {
		auth: {
			type: Object,
		}
	},

	data: () => ({
		login: '',
		password: '',
		shake: false,
		loading: false,
	}),

	computed: {
		action() {
			return Object.assign({}, this.auth.submit, {
				shake: this.shake,
				fit: true,
				loading: this.loading,
			});
		}
	},

	methods: {
		shakeAction() {
			clearTimeout(this.shake);
			this.shake = setTimeout(() => this.shake = false, 350);
		},

		async onSubmit(e) {
			// Проверка на валидацию
			const success = await this.$refs.form.validate();
			if (!success) {
				this.shakeAction();
				return;
			};

			this.loading = true;

			const userData = {
				login: this.login,
				password: this.password,
			};

			try {
				// Отправка запроса на авторизацию
				const { data: result } = await this.$provide.user.signin(userData);

				// В случае успеха переводим в админку
			} catch (err) {
				// Иначае выводим ошибки
			} finally {
				this.loading = false;
			}
		}
	},
}
</script>

<style lang="scss">
.auth {
	min-height: 100vh;
	display: flex;

	&__form {
		margin: auto;
		padding: rem(64) 0;

		@include media-breakpoint-down(sm) {
			width: 100%;
		}
	}
}

.auth-form {
	border: 1px solid rgba($color-dark, 0.3);
	border-radius: rem(2);
	padding: rem(48);

	@include media-breakpoint-up(md) {
		min-width: rem(384);
	}

	@include media-breakpoint-down(sm) {
		padding: rem(32);
	}

	&__title {
		@include h3;
	}

	&__header {
		margin-bottom: rem(32);
	}

	&__field {
		& + & {
			margin-top: rem(24);
		}
	}

	&__footer {
		margin-top: rem(32);
	}
}
</style>
