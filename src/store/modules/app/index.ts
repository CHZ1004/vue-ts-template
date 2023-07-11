import { defineStore } from 'pinia';
import { STORE_NAMES } from '@/enums';

interface AppState {
  /** 侧边栏折叠状态 */
  siderCollapse: boolean;
}
export const useAppStore = defineStore(STORE_NAMES.APP, {
  state: (): AppState => ({
    siderCollapse: true,
  }),
  actions: {
    /** 设置侧边栏折叠状态 */
    setSiderCollapse(collapse: boolean) {
      this.siderCollapse = collapse;
    },
    /** 折叠/展开 侧边栏折叠状态 */
    toggleSiderCollapse() {
      this.siderCollapse = !this.siderCollapse;
    },
  },
});
