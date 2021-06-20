declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
interface Result<T> {
	isSuccess: boolean;
	message?: string;
	data: T;
	errorCode: number;
}

interface PageData<T> {
	items: T[];
	total: number;
}

interface User {
	id: number;
	name: string;
	alias?: string;
	email?: string;
	roles?: Role[] | Option[];
	modules?: Module[];
	permissions?: Permission[];
	createdUser?: User;
}

interface Role {
	id: number;
	name: string;
	displayName?: string;
	description?: string;
	createdUser?: User;
	permissions?: Permission[];
}

interface Menu {
	id: number;
	isEnable: boolean;
	name: string;
	order: number;
	path: string;
	key: string;
	icon?: string;
	children?: Menu[];
	authority?: boolean;
}

interface Module {
	id: number;
	name: string;
	order: number;
	key: string;
	menus: Menu[];
}

interface Permission {
	id: any;
	name: string;
	key?: string; ///Menu Key
	displayName?: string;
}

interface PermissionTree {
	menu?: string;
	permissions: Permission[];
}

interface Option {
	id: number;
	name: string;
}

interface SearchFormProps<T> {
	onSearch: (payload: T) => void;
	onReset: () => void;
}
