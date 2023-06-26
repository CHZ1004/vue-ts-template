import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { lowerCase } from 'lodash-es';
import { ROUTE_NAMES } from '@/enums';

const { VITE_BASE_URL } = import.meta.env;
export const router = createRouter({
  history: createWebHashHistory(VITE_BASE_URL),
  routes: [
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
        },
      ],
    },
    {
      name: ROUTE_NAMES.LOGIN,
      path: `/${lowerCase(ROUTE_NAMES.LOGIN)}`,
      component: () => import('@/views/common/login/index.vue'),
    },
  ],
});

export function setupRouter(app: App) {
  app.use(router);
}
