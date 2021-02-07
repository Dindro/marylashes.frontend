<template>
	<CardTile
		title="Отчет"
		class="tile-report">

		<template #default>
			<div class="tile-report__field">
				<FieldInput label="Комментарии" v-model="comment" textarea/>
			</div>

			<div class="tile-report__field">
				<FieldImage
					v-model="photos"
					additional
					multiple
					size="sm"
					placeholder="Загрузить фото"/>
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
import FieldImage from '+/FieldImage';

export default {
	components: {
		CardTile,
		FieldInput,
		FieldCheckbox,
		FieldImage,
	},

	data: () => ({
		comment: '',
		photos: [],
	}),
}
</script>

<style lang="scss">
.tile-report {
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
