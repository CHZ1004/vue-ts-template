import { SystemDetailIps, System } from '@/api';

/** 系统下拉列表label渲染 */
export function renderSystemLabel(option: System) {
  return [h('span', option.systemName), option.isBPC && h('span', 'BPC')];
}
/** ip地址下拉列表label渲染 */
export function renderIpLabel(option: SystemDetailIps) {
  return [h('span', option.addressName), h('span', option.addressIp)];
}

/**
 * 获取ipid里列表
 * @param ips ip列表
 * @param isClear 是否是清空
 */
export function handleIpIdList(ips?: SystemDetailIps[]): string[] {
  if (!ips?.length) return [];
  return ips.map((item) => item.addressId);
}
/**
 * 获取id地址列表
 * @param ips ip数据数组
 * @param ids 选中ip的id数组
 */
export function handleIpAddressList(ips: SystemDetailIps[], ids: string[]) {
  return ips.reduce<string[]>((result, ip) => {
    ids.includes(ip.addressId) && result.push(ip.addressIp);
    return result;
  }, []);
}

/**
 * 键值对形式转为数组对象形式
 * @param map 键值对对象
 * @returns 数组对象
 */
export function handleMap(map: Record<string, string>) {
  return Object.entries(map).map(([value, label]) => {
    return {
      value,
      label,
    };
  });
}
