import { defineStore } from 'pinia';
import { SotreNames } from '@/store/store-namespace';
import { AppStore } from '@/store/types';

export const useAppStore = defineStore(SotreNames.App, {
  state: (): AppStore => ({
    contentFull: false,
    collapse: false,
  }),
  actions: {
    /** 设置侧边栏折叠状态 */
    setCollapse(collapse: boolean) {
      this.collapse = collapse;
    },
    /** 折叠/展开 侧边栏折叠状态 */
    toggleCollapse() {
      this.collapse = !this.collapse;
    },
  },
});
