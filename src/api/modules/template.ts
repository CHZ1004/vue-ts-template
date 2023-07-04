import { alovaInstance } from '@/utils';
import { SceneGuoup, Scene } from '../model';

enum Api {
  SceneList = 'template/list',
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
  return alovaInstance.Get<SceneGuoup[]>(Api.SceneGuoupList, { params: { groupName } });
};

/** 编辑/新增场景模板分组 */
export const editSceneGuoup = (data: Partial<SceneGuoup>) => {
  return alovaInstance.Post(Api.EditSceneGuoups, data);
};

/** 删除分组 */
export const deleteSceneGuoup = (groupId: string) => {
  return alovaInstance.Post(Api.DeleteSceneGuoup, { groupId });
};
