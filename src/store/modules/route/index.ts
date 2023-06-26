import { defineStore } from 'pinia';
import { ROUTE_NAMES, STORE_NAMES } from '@/enums';
import { routes as staticRoutes } from '@/router';

interface RouteState {
  menus: {
    title: string;
    key: ROUTE_NAMES;
    path: string;
  }[];
}

export const useRouteStore = defineStore(STORE_NAMES.ROUTE, {
  state: (): RouteState => ({
    menus: [],
  }),
  actions: {
    /** 初始化静态路由 */
    initStaticRoute() {
      const routes = staticRoutes.filter((route) => route.name === 'ROOT');
      this.menus = (routes[0].children || []).map((route) => {
        return {
          ...route.meta,
          key: route.name,
          path: route.path,
        };
      });
      return this.menus;
    },
    /** 初始化路由 */
    initAuthRoute() {
      this.initStaticRoute();
    },
  },
});
