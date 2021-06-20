import { Effect } from 'umi';

export interface BasicEffect {
    fetch: Effect;
    get: Effect;
}


export enum PermissionType {
	ViewUser = 1,
	CreateUser = 2,
	UpdateUser = 3,
	DeleteUser = 4,
	ViewRole = 5,
	CreateRole = 6,
	UpdateRole = 7,
	DeleteRole = 8,
}