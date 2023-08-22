import { alovaInstance } from '@/utils';
import type { LoginResponse, LoginParams } from '../model';

enum Api {
  LOGIN = 'user/login',
  LOGOUT = 'user/logout',
}

/** 登录 */
export const fetchLogin = (data: LoginParams) => {
  return alovaInstance.Post<LoginResponse>(Api.LOGIN, {
    ...data,
  });
};

/** 退出登录 */
export const fetchLogout = () => {
  return alovaInstance.Post<LoginResponse>(Api.LOGOUT);
};
