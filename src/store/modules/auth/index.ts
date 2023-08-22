import { defineStore } from 'pinia';
import { LOGIN, router } from '@/router';
import { STORE_NAMES } from '../../namespace';
import { LoginParams, LoginResponse, fetchLogin, fetchLogout } from '@/api';
import { getToken, setToken, wait, local, successMessage } from '@/utils';

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
    /** 账号密码登录获取token */
    async login(params: LoginParams) {
      this.loginLoading = true;
      const data = await fetchLogin(params).send();
      if (data) {
        await this.handleActionAfterLogin(data);
      }
      this.loginLoading = false;
    },
    /** 登录后处理 */
    async handleActionAfterLogin(data: LoginResponse) {
      const { token } = data;
      const loginSuccess = await this.loginByToken(token);
      if (loginSuccess) {
        router.push({ name: 'HOME', replace: true });
        successMessage('登录成功');
      }
    },
    /** token登录获取用户信息 */
    async loginByToken(token: string) {
      setToken(token);
      // TODO 根据token获取用户信息, 并存储
      const successFlag = true;
      await wait(0);
      this.token = token;
      return successFlag;
    },
    /** 退出登录 */
    async logout() {
      await fetchLogout().send();
      local.clear();
      router.push({ name: LOGIN, replace: true });
    },
  },
});
