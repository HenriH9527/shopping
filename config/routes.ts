interface Route {
	path: string;
	component?: string;
	routes?: Route[];
	name?: string;
	redirect?: string;
}

const routes: Route[] = [
	{
		path: '/',
		component: '../layouts/BlankLayout',
		routes: [
			{
				path: '/login',
				component: '../layouts/UserLayout',
				routes: [
					{
						name: 'login',
						path: '/login',
						component: './user/login',
					},
				],
			},
			{
				path: '/logout',
				routes: [
					{
						name: 'logout',
						path: '/logout',
						component: './user/logout',
					},
				],
			},
			{
				path: '/forgot-password',
				component: '../layouts/UserLayout',
				routes: [
					{
						name: 'forgot password',
						path: '/forgot-password',
						component: './user/forgot-password',
					},
				],
			},
			{
				path: '/',
				component: '../layouts/SecurityLayout',
				routes: [
					{
						path: '/',
						routes: [
							{
								path: '/admin',
								component: '../layouts/BasicLayout',
								routes: [
									{
										path: '/admin',
										redirect: '/admin/user-management',
									},
									{
										path: '/admin/user-management',
										component: './admin/user',
									},
									{
										path: '/admin/role-management',
										component: './admin/role',
									},
								],
							},
							{
								path: '/change-password',
								name: 'Change Password',
								component: './user/change-password',
							},
							{
								path: '/',
								name: 'Home Page',
								component: './home',
							},
						],
					},
				],
			},
		],
	},
];

export default routes;
