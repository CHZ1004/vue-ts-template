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
