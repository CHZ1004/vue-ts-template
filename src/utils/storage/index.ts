import { STORAGE_NAMES } from '@/enums';
import { local } from './local';

export * from './local';

/** token操作 */
export const getToken = () => {
  return local.get(STORAGE_NAMES.TOKEN) || '';
};
export const setToken = (data: string, expire?: number | null) => {
  local.set(STORAGE_NAMES.TOKEN, data, expire);
};
export const removeToken = () => {
  local.remove(STORAGE_NAMES.TOKEN);
};
