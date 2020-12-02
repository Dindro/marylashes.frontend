import photo from '@/provide/photo';
import meet from '@/provide/meet';
import review from '@/provide/review';

export default (ctx, inject) => {
	const provide = {
		photo: photo(ctx.$axios),
		meet: meet(ctx.$axios),
		review: review(ctx.$axios),
	};

	inject('provide', provide);
};
