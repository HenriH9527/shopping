import { environment } from './../environment/environment';

import * as service from './service';

export async function query(payload: any): Promise<Result<PageData<User>>> {
	return await service.query(`${environment.userBaseUrl}/query`, payload);
}

export async function get(id: number): Promise<Result<User>> {
	return await service.get(`${environment.userBaseUrl}/${id}`);
}

export async function remove(id: number): Promise<Result<any>> {
	return await service.remove(`${environment.userBaseUrl}/${id}`);
}

export async function create(payload: User): Promise<Result<User>> {
	return await service.create(`${environment.userBaseUrl}`, payload);
}

export async function update(payload: User): Promise<Result<User>> {
	return await service.update(`${environment.userBaseUrl}`, payload);
}

export async function login(payload: any): Promise<Result<User>> {
	return await service.post(`${environment.securityBaseUrl}/login`, payload);
}

export async function logout(): Promise<Result<any>> {
	return await service.get(`${environment.securityBaseUrl}/logout`);
}

export async function getCurrent(): Promise<Result<User>> {
	return await service.get(`${environment.securityBaseUrl}/current`);
}
