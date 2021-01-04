<template>
	<div class="list-paginate">
		<div class="list-paginate__action">
			<slot>
				<LinkAction/>
			</slot>
		</div>

		<div class="list-paginate__paginate">
			<Paginate/>
		</div>
	</div>
</template>

<script>
import LinkAction from '+/LinkAction';
import Paginate from '&/Paginate';

export default {
	components: {
		Paginate,
		LinkAction,
	},
}
</script>

<style lang="scss">
.list-paginate {
	display: flex;
	justify-content: space-between;
}
</style>
