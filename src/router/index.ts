import { App, Component, h } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { lowerCase } from 'lodash-es';
import { NIcon } from 'naive-ui';
import { ROUTE_NAMES } from '@/enums';
import IconCiHouse02 from '~icons/ci/house02';
import IconAkarIconspentagon from '~icons/akar-icons/pentagon';
import IconMdiCheckboxBlankOutline from '~icons/mdi/checkbox-blank-outline';

const { VITE_BASE_URL } = import.meta.env;
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
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
          icon: renderIcon(IconCiHouse02),
        },
      },
      {
        name: ROUTE_NAMES.INSPECTION,
        path: `/${lowerCase(ROUTE_NAMES.INSPECTION)}`,
        component: () => import('@/views/inspection/index.vue'),
        meta: {
          title: lowerCase(ROUTE_NAMES.INSPECTION_NAME),
          icon: renderIcon(IconMdiCheckboxBlankOutline),
        },
      },
      {
        name: ROUTE_NAMES.SCENE,
        path: `/${lowerCase(ROUTE_NAMES.SCENE)}`,
        component: () => import('@/views/scene/index.vue'),
        meta: {
          title: lowerCase(ROUTE_NAMES.SCENE_NAME),
          icon: renderIcon(IconAkarIconspentagon),
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
