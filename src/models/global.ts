import { Effect, Subscription } from 'umi';

import { trim } from 'lodash';
import { logAccessInfo } from '@/service/logService';

export interface ModelType {
	namespace: string;
	state: any;
	effects: { logAccessInfo: Effect };
	subscriptions: { setup: Subscription };
}

const Model: ModelType = {
	namespace: 'global',
	state: {},
	effects: {
		*logAccessInfo({ payload }, { call, put }) {
			yield call(logAccessInfo, payload);
		},
	},
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname }) => {
				//dispatch({ type: 'logAccessInfo', payload: trim(pathname, '//') });
			});
		},
	},
};

export default Model;
