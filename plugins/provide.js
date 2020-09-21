import photo from '@/provide/photo';

export default (ctx, inject) => {
	const provide = {
		photo: photo(ctx.$axios),
	}

	inject('provide', provide);
};
