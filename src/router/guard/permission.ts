import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { ROUTE_NAMES } from '../namespace';
import { getToken } from '@/utils';

const { LOGIN, HOME } = ROUTE_NAMES;
/** 处理路由页面的跳转 */
export async function createPermissionGuard(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const isLogin = Boolean(getToken());
  // 已登陆状态前往登录，跳转至首页
  if (to.name === LOGIN && isLogin) {
    next({ name: HOME, replace: true });
    return;
  }
  // 为登录前往登录页面 跳转至登录页
  if (to.name !== LOGIN && !isLogin) {
    const redirect = to.fullPath;
    next({ name: LOGIN, query: { redirect } });
    return;
  }
  next();
}
