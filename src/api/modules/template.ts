import { alovaInstance } from '@/utils';
import { SceneGuoup, Scene } from '../model';

enum Api {
  SceneList = 'template/list',
  SceneEnable = 'template/enable',
  SceneGuoupList = 'template-group/list',
}

/** 获取所有场景模板 */
export const getScenes = (groupId: string) => {
  return alovaInstance.Get<Scene[]>(Api.SceneList, { params: { groupId } });
};

/** 设置默认场景模板 */
export const setEnableScene = (templateId: string) => {
  return alovaInstance.Post(Api.SceneEnable, { templateId });
};

/** 获取模板分组 */
export const getSceneGroups = () => {
  return alovaInstance.Get<SceneGuoup[]>(Api.SceneGuoupList);
};
