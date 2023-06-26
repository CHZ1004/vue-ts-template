import { defineStore } from 'pinia';
import { router } from '@/router';
import { STORAGE_NAMES, STORE_NAMES } from '@/enums';
import { LoginParams, LoginResponse, fetchLogin } from '@/api';
import { local, wait } from '@/utils';
import { getToken } from './helpers';

interface AuthState {
  token: string;
  loginLoading: boolean;
}
export const useAuthStore = defineStore(STORE_NAMES.AUTH, {
  state: (): AuthState => ({
    token: getToken(),
    loginLoading: false,
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return state.loginLoading;
    },
  },
  actions: {
    /** 登录后处理 */
    async handleActionAfterLogin(data: LoginResponse) {
      console.log('🚀 ~ router:', router);
      const { token } = data;
      const loginSuccess = await this.loginByToken(token);
      if (loginSuccess) {
        router.push({ name: 'HOME', replace: true });
      }
    },
    /** 账号密码登录获取token */
    async login(params: LoginParams) {
      this.loginLoading = true;
      await wait(1000);
      const data = await fetchLogin(params).send();
      if (data) {
        await this.handleActionAfterLogin(data);
      }
      this.loginLoading = false;
    },
    /** token登录获取用户信息 */
    async loginByToken(token: string) {
      local.set(STORAGE_NAMES.TOKEN, token);
      // TODO 根据token获取用户信息, 并存储
      const successFlag = true;
      await wait(0);
      this.token = token;
      return successFlag;
    },
  },
});
