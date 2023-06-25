import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const { VITE_BASE_URL } = import.meta.env;
export const router = createRouter({
  history: createWebHashHistory(VITE_BASE_URL),
  routes: [
    {
      name: 'LOGIN',
      path: '/',
      component: () => import('@/views/common/login/index.vue'),
    },
  ],
});

export function setupRouter(app: App) {
  app.use(router);
}
