import { defineStore } from 'pinia';
import { STORE_NAMES } from '../../namespace';
import { Group, getInspectionGroups } from '@/api';

interface AppState {
  /** 侧边栏折叠状态 */
  siderCollapse: boolean;
  /** 分组折叠状态 */
  groupCollapse: boolean;
  /** 分组数据 */
  groups: Group[];
}
export const useAppStore = defineStore(STORE_NAMES.APP, {
  state: (): AppState => ({
    siderCollapse: true,
    groupCollapse: false,
    groups: [],
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
    async setGroups(name?: string) {
      this.groups = await getInspectionGroups(name).send();
    },
  },
});
