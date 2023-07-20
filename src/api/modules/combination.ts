import { alovaInstance } from '@/utils';
import { Combination, CombinationDetail, CombinationItem } from '../models';

enum Api {
  List = 'combination/list',
  Add = 'combination/save',
  Delete = 'combination/del',
  Update = 'combination/update',
  Detail = 'combination/detail',
  Bind = 'combination/bind',
  Upload = 'combination/upload',
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

/** 获取分组详情 */
export function getCombinationDetail(id: string) {
  return alovaInstance.Get<CombinationDetail>(`${Api.Detail}?id=${id}`);
}

/** 分组产品绑定/解绑 */
export function bindCombination(data: Partial<CombinationItem>[]) {
  return alovaInstance.Post(Api.Bind, data);
}

/** excel上传 */
export function uploadExcel(data: FormData) {
  return alovaInstance.Post<CombinationDetail>(Api.Upload, data, {
    headers: {},
  });
}
