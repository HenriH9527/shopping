import { Effect, Reducer, history } from 'umi';

import { login, logout, getCurrent } from '../service/userService';

export interface StateType {
	isSuccess?: boolean;
	message?: string;
	currentUser?: User;
}

export interface ModelType {
	namespace: string;
	state: StateType;
	effects: {
		login: Effect;
		logout: Effect;
		getCurrent: Effect;
	};
	reducers: {
		save: Reducer<StateType>;
	};
}

const Model: ModelType = {
	namespace: 'login',
	state: {
		currentUser: undefined,
	},
	effects: {
		*login({ payload }, { call, put }) {
			yield put({
				type: 'save',
				payload: { onLoading: true },
			});
			const response = yield call(login, payload);
			const { data = {}, isSuccess, message } = response;

			const { user } = data || {};

			yield put({
				type: 'save',
				payload: { currentUser: user, isSuccess, message, onLoading: false },
			});

			if (isSuccess) {
				history.push('/');
			}
		},
		*logout({ payload }, { call, put }) {
			const response = yield call(logout, payload);
			yield put({
				type: 'save',
				payload: {},
			});
		},
		*getCurrent({ payload }, { call, put }) {
			const response = yield call(getCurrent, payload);
		},
	},
	reducers: {
		save(state, { payload }) {
			return { ...state, ...payload };
		},
	},
};

export default Model;
