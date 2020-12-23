<template>
	<div class="auth">
		<div class="auth__form">
			<validation-observer ref="form" slim>
				<div class="auth-form">
					<form @submit="onSubmit">
						<div class="auth-form__header">
							<h1 class="auth-form__title">{{ auth.title }}</h1>
						</div>

						<div class="auth-form__content">
							<field class="auth-form__field" v-bind="auth.login" v-model="login"/>
							<field class="auth-form__field" v-bind="auth.password" v-model="password"/>
						</div>

						<div class="auth-form__footer">
							<btn :button="Object.assign({}, auth.submit, { fit: true })"/>
						</div>
					</form>
				</div>
			</validation-observer>
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
		login: "",
		password: "",
	}),

	methods: {
		async onSubmit() {

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
		opacity: 0.65;
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
