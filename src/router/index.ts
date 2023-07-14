import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { lowerCase } from 'lodash-es';
import { ROUTE_NAMES } from './namespace';

const { VITE_BASE_URL } = import.meta.env;
const { HOME, INSPECTION, SCENE, LOGIN } = ROUTE_NAMES;
export const routes = [
  {
    name: 'ROOT',
    path: '/',
    redirect: `/${lowerCase(HOME)}`,
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: HOME,
        path: `/${lowerCase(HOME)}`,
        component: () => import('@/views/home/index.vue'),
      },
      {
        name: INSPECTION,
        path: `/${lowerCase(INSPECTION)}`,
        component: () => import('@/views/inspection/index.vue'),
      },
      {
        name: SCENE,
        path: `/${lowerCase(SCENE)}`,
        component: () => import('@/views/scene/index.vue'),
      },
    ],
  },
  {
    name: LOGIN,
    path: `/${lowerCase(LOGIN)}`,
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

export * from './namespace';
