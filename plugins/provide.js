import photo from '@/provide/photo';
import meet from '@/provide/meet';
import review from '@/provide/review';
import component from '@/provide/component';
import user from '@/provide/user';
import { setApi, setCtx } from '@/provide/utils';

export default (ctx, inject) => {
	const api = ctx.$axios.create({
		baseURL: process.env.API_SERVER_URL || 'http://0.0.0.0:3001/api',
	});

	const provide = {
		photo: photo(api),
		meet: meet(api),
		review: review(api),
		component: component(api),
		user: user(api),
	};

	setApi(api);
	setCtx(ctx);

	inject('provide', provide);
};
