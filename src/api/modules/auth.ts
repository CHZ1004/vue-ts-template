import { alovaInstance } from '@/utils';
import { LoginResponse, LoginParams } from '../model';

enum Api {
  LOGIN = 'user/login',
}

export const fetchLogin = (data: LoginParams) => {
  return alovaInstance.Post<LoginResponse>(Api.LOGIN, {
    ...data,
  });
};