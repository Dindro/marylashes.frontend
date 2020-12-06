import photo from '@/provide/photo';
import meet from '@/provide/meet';
import review from '@/provide/review';
import component from '@/provide/component';

export default (ctx, inject) => {
	const provide = {
		photo: photo(ctx.$axios),
		meet: meet(ctx.$axios),
		review: review(ctx.$axios),
		component: component(ctx.$axios),
	};

	inject('provide', provide);
};
