import { defineStore } from 'pinia';
import { ROUTE_NAMES } from '@/router';

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
      return this.menus;
    },
    /** 初始化路由 */
    initAuthRoute() {
      this.initStaticRoute();
    },
  },
});
