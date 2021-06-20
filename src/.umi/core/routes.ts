// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'F:/work/client/src/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'F:/work/client/src/src/layouts/BlankLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/login",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'F:/work/client/src/src/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "name": "login",
            "path": "/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__login' */'F:/work/client/src/src/pages/user/login'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/logout",
        "routes": [
          {
            "name": "logout",
            "path": "/logout",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__logout' */'F:/work/client/src/src/pages/user/logout'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/forgot-password",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'F:/work/client/src/src/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "name": "forgot password",
            "path": "/forgot-password",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__forgot-password' */'F:/work/client/src/src/pages/user/forgot-password'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'F:/work/client/src/src/layouts/SecurityLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/",
            "routes": [
              {
                "path": "/admin",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'F:/work/client/src/src/layouts/BasicLayout'), loading: LoadingComponent}),
                "routes": [
                  {
                    "path": "/admin",
                    "redirect": "/admin/user-management",
                    "exact": true
                  },
                  {
                    "path": "/admin/user-management",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__admin__user' */'F:/work/client/src/src/pages/admin/user'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/admin/role-management",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__admin__role' */'F:/work/client/src/src/pages/admin/role'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "path": "/change-password",
                "name": "Change Password",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__change-password' */'F:/work/client/src/src/pages/user/change-password'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/",
                "name": "Home Page",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__home' */'F:/work/client/src/src/pages/home'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          }
        ]
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
