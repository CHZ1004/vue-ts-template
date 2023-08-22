import type { Group } from '@/api';
import { SCENE, INSPECTION } from '@/router';
import { STORE_NAMES } from '@/store/namespace';
import { GroupTypeMap } from './helpers';

type GroupType = typeof SCENE | typeof INSPECTION;

interface GroupState extends Record<string, unknown> {
  /** 分组展开状态 */
  sceneCollapse: boolean;
  inspectionCollapse: boolean;
  /** 分组数据 */
  sceneGroups: Group[];
  inspectionGroups: Group[];
  /** 分组loading */
  loading: boolean;
  /** 分组类型 */
  groupType: GroupType;
}

export const useGroupStore = defineStore(STORE_NAMES.GROUP, {
  state: (): GroupState => ({
    sceneCollapse: false,
    inspectionCollapse: false,
    sceneGroups: [],
    inspectionGroups: [],
    loading: false,
    groupType: SCENE,
  }),
  actions: {
    /** 获取分组数据 */
    async sendGroups(name?: string) {
      this.loading = true;
      const { title, send } = GroupTypeMap[this.groupType];
      this[title] = await send(name).send();
      this.loading = false;
    },
    /**
     * 更新分组
     * @param data 新增/编辑的分组数据
     * @param name 更新分组数据的查询词
     */
    async updateGroup(data: Partial<Group>, name?: string) {
      this.loading = true;
      await await GroupTypeMap[this.groupType].update(data).send();
      await this.sendGroups(name);
      this.loading = false;
    },
    /**
     * 删除分组
     * @param id 删除分组的id
     * @param name 更新分组数据的查询词
     */
    async deleteGroup(id: string, name: string) {
      this.loading = true;
      await GroupTypeMap[this.groupType].delete(id).send();
      await this.sendGroups(name);
      this.loading = false;
    },
  },
});
