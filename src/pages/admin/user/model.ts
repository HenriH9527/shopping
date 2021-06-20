import { Reducer } from 'umi';
import { BasicEffect } from './../../../models/common.d';

import { query, get } from '@/service/userService';

export interface StateType {
	items: User[];
	total: number;
	currentItem?: User;
}

export interface ModelType {
	namespace: string;
	state: StateType;
	effects: BasicEffect;
	reducers: {
		save: Reducer<StateType>;
	};
}

const Model: ModelType = {
	namespace: 'userManagement',
	state: {
		items: [],
		total: 0,
	},
	effects: {
		*fetch({ payload }, { call, put }) {
			const response = yield call(query, payload);
			const { data } = response;

			yield put({
				type: 'save',
				payload: data,
			});
		},
		*get({ payload }, { call, put }) {
			const response = yield call(get, payload);
			const { data } = response;
			yield put({
				type: 'save',
				payload: { currentItem: data },
			});
		},
	},
	reducers: {
		save(state, { payload }) {
			return { ...state, ...payload };
		},
	},
};

export default Model;
