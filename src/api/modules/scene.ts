import { alovaInstance } from '@/utils';
import type { Group, Scene, Page, PageResponse } from '../model';

enum Api {
  SceneList = 'template/list',
  ScenePageList = 'template/page',
  SaveScene = 'template/save',
  SceneCopy = 'template/copy',
  SceneDelete = 'template/delete',
  SceneMove = 'template/move',
  SceneEnable = 'template/enable',
  DefaultScene = 'template/get',
  SceneGuoupList = 'template-group/list',
  EditSceneGuoups = 'template-group/save',
  DeleteSceneGuoup = 'template-group/delete',
}

/** 获取所有场景模板 */
export const getScenes = (groupId: string) => {
  return alovaInstance.Get<Scene[]>(Api.SceneList, { params: { groupId } });
};

/** 分页获取场景模板 */
export const getPageScenes = (params: Page) => {
  return alovaInstance.Get<PageResponse<Scene>>(Api.ScenePageList, { params });
};

/** 编辑/新增场景模板 */
export const sceneSave = (data: Partial<Scene>) => {
  return alovaInstance.Post(Api.SaveScene, data);
};

/** 场景复制 */
export const sceneCopy = (templateId: string) => {
  return alovaInstance.Post(Api.SceneCopy, { templateId });
};

/** 场景删除 */
export const sceneDelete = (templateId: string) => {
  return alovaInstance.Post(Api.SceneDelete, { templateId });
};

/** 场景移动分组 */
export const sceneMove = (data: Partial<Scene>) => {
  return alovaInstance.Post(Api.SceneMove, data);
};

/** 设置默认场景模板 */
export const setEnableScene = (templateId: string) => {
  return alovaInstance.Post(Api.SceneEnable, { templateId });
};

/** 获取默认场景模板 */
export const getDefaultScene = () => {
  return alovaInstance.Get<Scene>(Api.DefaultScene);
};

/** 获取模板分组 */
export const getSceneGroups = (groupName = '') => {
  return alovaInstance.Get<Group[]>(Api.SceneGuoupList, { params: { groupName } });
};

/** 编辑/新增场景模板分组 */
export const editSceneGuoup = (data: Partial<Group>) => {
  return alovaInstance.Post(Api.EditSceneGuoups, data);
};

/** 删除分组 */
export const deleteSceneGuoup = (groupId: string) => {
  return alovaInstance.Post(Api.DeleteSceneGuoup, { groupId });
};
