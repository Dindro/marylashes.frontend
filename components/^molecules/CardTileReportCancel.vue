<template>
	<CardTile
		title="Отчет отмены"
		class="tile-report-cancel">

		<template #default>
			<div class="tile-report-cancel__field">
				<FieldCheckbox type="radio" label="Инициатива клиента" name="INICIATIVE" v-model="iniciative" value="client"/>
				<FieldCheckbox type="radio" label="Инициатива мастера" name="INICIATIVE" v-model="iniciative" value="master"/>
			</div>

			<div class="tile-report-cancel__field">
				<FieldInput label="Причина" v-model="cause" textarea/>
			</div>
		</template>

		<template #footer>
			<LinkAction :link="{ text: 'Отправить отчет', tag: 'button' }"/>
		</template>
	</CardTile>
</template>

<script>
import CardTile from '^/CardTile';
import FieldCheckbox from '+/FieldCheckbox';
import FieldInput from '+/FieldInput';

export default {
	components: {
		CardTile,
		FieldInput,
		FieldCheckbox,
	},

	data: () => ({
		iniciative: 'client',
		cause: '',
	}),
}
</script>

<style lang="scss">
.tile-report-cancel {
	&__field {
		display: flex;
		flex-direction: column;

		> * + * {
			margin-top: rem(8);
		}

		& + & {
			margin-top: rem(24);
		}
	}

	.input--textarea {
		height: rem(112);
	}
}
</style>
