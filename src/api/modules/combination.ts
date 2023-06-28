import { alovaInstance } from '@/utils';
import { Combination } from '../models';

enum Api {
  List = 'combination/list',
  Add = 'combination/save',
  Delete = 'combination/del',
  Update = 'combination/update',
}

/** 获取分组列表 */
export function getCombinationList() {
  return alovaInstance.Get<Combination[]>(Api.List);
}

/** 添加分组 */
export function addCombination(combinationName: string) {
  return alovaInstance.Post(Api.Add, { combinationName });
}

/** 删除分组 */
export function deleteCombination(id: string) {
  return alovaInstance.Delete(`${Api.Delete}?id=${id}`);
}

/** 编辑分组 */
export function UpdateCombination(data: Combination) {
  return alovaInstance.Post(Api.Update, data);
}
