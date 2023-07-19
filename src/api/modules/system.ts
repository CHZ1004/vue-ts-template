import { alovaInstance } from '@/utils';
import type { System, SystemDetail } from '../model';

enum Api {
  systemList = 'system/list',
  systemDetail = 'system/detail',
}

/** 获取所有系统 */
export const getSystemList = (systemName?: string) => {
  return alovaInstance.Get<System[]>(Api.systemList, { params: { systemName } });
};

/** 获取系统详情 */
export const getSystemDetail = (systemId?: string) => {
  return alovaInstance.Get<SystemDetail>(Api.systemDetail, { params: { systemId } });
};
