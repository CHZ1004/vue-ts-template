import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { lowerCase } from 'lodash-es';
import { ROUTE_NAMES } from '@/enums';

const { VITE_BASE_URL } = import.meta.env;
export const routes = [
  {
    name: 'ROOT',
    path: '/',
    redirect: `/${lowerCase(ROUTE_NAMES.HOME)}`,
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: ROUTE_NAMES.HOME,
        path: `/${lowerCase(ROUTE_NAMES.HOME)}`,
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: lowerCase(ROUTE_NAMES.HOME_NAME),
        },
      },
      {
        name: ROUTE_NAMES.INSPECTION,
        path: `/${lowerCase(ROUTE_NAMES.INSPECTION)}`,
        component: () => import('@/views/inspection/index.vue'),
        meta: {
          title: lowerCase(ROUTE_NAMES.INSPECTION_NAME),
        },
      },
      {
        name: ROUTE_NAMES.SCENE,
        path: `/${lowerCase(ROUTE_NAMES.SCENE)}`,
        component: () => import('@/views/scene/index.vue'),
        meta: {
          title: lowerCase(ROUTE_NAMES.SCENE_NAME),
        },
      },
    ],
  },
  {
    name: ROUTE_NAMES.LOGIN,
    path: `/${lowerCase(ROUTE_NAMES.LOGIN)}`,
    component: () => import('@/views/common/login/index.vue'),
  },
];
export const router = createRouter({
  history: createWebHashHistory(VITE_BASE_URL),
  routes,
});

export function setupRouter(app: App) {
  app.use(router);
}
