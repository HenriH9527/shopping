import { Environment } from './environment.d';

const baseUrl: string = 'http://81.69.18.254';

export const environment: Environment = {
	baseUrl,
	userBaseUrl: `${baseUrl}/api/users`,
	roleBaseUrl: `${baseUrl}/api/roles`,
	permissionBaseUrl: `${baseUrl}/api/permissions`,
	logBaseUrl: `${baseUrl}/api/logs`,
	demoBaseUrl: `${baseUrl}/api/demos`,
	securityBaseUrl: `${baseUrl}/api/security`,
};
