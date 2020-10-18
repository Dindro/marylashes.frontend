import photo from '@/provide/photo';
import meet from '@/provide/meet';

export default (ctx, inject) => {
	const provide = {
		photo: photo(ctx.$axios),
		meet: meet(ctx.$axios),
	};

	inject('provide', provide);
};
