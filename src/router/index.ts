import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/special-account',
        name: 'SpecialAccount',
        component: () => import('@/views/special-account/index.vue'),
      },
      {
        path: '/daily',
        name: 'Daily',
        component: () => import('@/views/daily/index.vue'),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app: App) {
  app.use(router);
}
