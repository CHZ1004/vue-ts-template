import { alovaInstance } from '@/utils';
import { InspectionGuoup } from '../model';

enum Api {
  InspectionGroupList = 'inspection-group/list',
  EditInspectionGroup = 'inspection-group/save',
  DeleteInspectionGroup = 'inspection-group/delete',
}

/** 获取巡检场景分组 */
export const getInspectionGroups = (groupName = '') => {
  return alovaInstance.Get<InspectionGuoup[]>(Api.InspectionGroupList, { params: { groupName } });
};

/** 编辑/新增场景模板分组 */
export const editInspectionGuoup = (data: Partial<InspectionGuoup>) => {
  return alovaInstance.Post(Api.EditInspectionGroup, data);
};

/** 删除分组 */
export const deleteInspectionGuoup = (groupId: string) => {
  return alovaInstance.Post(Api.DeleteInspectionGroup, { groupId });
};
