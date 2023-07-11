import { alovaInstance } from '@/utils';
import { Group, Inspection, Page, PageResponse } from '../model';

enum Api {
  InspectionGroupList = 'inspection-group/list',
  InspectionSave = 'inspection/save',
  InspectionCopy = 'inspection/copy',
  InspectionDelete = 'inspection/delete',
  InspectionMove = 'inspection/move',
  InspectionPageList = 'inspection/page',
  EditInspectionGroup = 'inspection-group/save',
  DeleteInspectionGroup = 'inspection-group/delete',
}

/** 分页获取场景模板 */
export const getPageInspection = (params: Page) => {
  return alovaInstance.Get<PageResponse<Inspection>>(Api.InspectionPageList, { params });
};

/** 编辑/新增场景模板 */
export const inspectionSave = (data: Partial<Inspection>) => {
  return alovaInstance.Post(Api.InspectionSave, data);
};

/** 场景复制 */
export const inspectionCopy = (inspectionId: string) => {
  return alovaInstance.Post(Api.InspectionCopy, { inspectionId });
};

/** 场景删除 */
export const inspectionDelete = (inspectionId: string) => {
  return alovaInstance.Post(Api.InspectionDelete, { inspectionId });
};

/** 场景移动分组 */
export const inspectionMove = (data: Partial<Inspection>) => {
  return alovaInstance.Post(Api.InspectionMove, data);
};

/** 获取巡检场景分组 */
export const getInspectionGroups = (groupName = '') => {
  return alovaInstance.Get<Group[]>(Api.InspectionGroupList, { params: { groupName } });
};

/** 编辑/新增场景模板分组 */
export const editInspectionGuoup = (data: Partial<Group>) => {
  return alovaInstance.Post(Api.EditInspectionGroup, data);
};

/** 删除分组 */
export const deleteInspectionGuoup = (groupId: string) => {
  return alovaInstance.Post(Api.DeleteInspectionGroup, { groupId });
};
