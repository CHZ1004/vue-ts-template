import { STORAGE_NAMES } from '@/enums';
import { local } from '@/utils';

/** 获取token */
export function getToken() {
  return local.get(STORAGE_NAMES.TOKEN) || '';
}

/** 获取用户信息 */
// TODO 暂无
export function getUserInfo() {
  return {};
}

/** 清除用户相关缓存 */
export function clearAuthStorage() {
  local.remove(STORAGE_NAMES.TOKEN);
}
