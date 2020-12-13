import photo from '@/provide/photo';
import meet from '@/provide/meet';
import review from '@/provide/review';
import component from '@/provide/component';

export default (ctx, inject) => {
	const api = ctx.$axios.create({
		baseURL: process.env.API_SERVER_URL || 'http://0.0.0.0:3001/api',
	});

	const provide = {
		photo: photo(api),
		meet: meet(api),
		review: review(api),
		component: component(api),
	};

	inject('provide', provide);
};
