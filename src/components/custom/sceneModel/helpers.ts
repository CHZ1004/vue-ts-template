import { SystemDetailIps, System, SceneTemplate, DisplayTypeEnum } from '@/api';
import { events } from '@/utils';

export const DisplayType = [
  {
    value: DisplayTypeEnum.system,
    label: '对比系统',
  },
  {
    value: DisplayTypeEnum.time,
    label: '对比时间',
  },
];
export const rules = {
  templateName: {
    required: true,
    message: '请输入场景名称',
    trigger: ['blur'],
  },
  templateTime: {
    required: true,
    message: '请选择时间',
    trigger: ['change'],
  },
  system: {
    required: true,
    message: `请选择系统`,
    trigger: ['change', 'blur'],
  },
  ipIdList: {
    type: 'array',
    required: true,
    message: `请选择系统IP`,
    trigger: ['change', 'blur', 'input'],
  },
};
export const createIndicatorData = () => ({
  key: nanoid(),
  indicator: null,
  type: null,
});
export function createTemplateData(num = 1): SceneTemplate {
  return {
    key: nanoid(),
    system: null,
    systemName: '',
    ips: [],
    ipIdList: null,
    capSpv: '',
    time: '',
    granularity: '',
    timeType: '',
    dataList: [...new Array(num)].map(() => createIndicatorData()),
  };
}

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
export function handleIpAddressList(ips: SystemDetailIps[], ids: string[] | null) {
  return ips.reduce<string[]>((result, ip) => {
    ids?.includes(ip.addressId) && result.push(ip.addressIp);
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

export const handleIndicator = (type: string, index: number, data?: any) => {
  data && Reflect.deleteProperty(data, 'key');
  events.emit('HandelrIndicator', {
    type,
    index,
    data,
  });
};

export const ChartMap: Record<string, string> = {
  bar: '柱形图',
  LeftBar: '条状图',
  line: '折线图',
  area: '面积图',
};

export const BpcChartMap: Record<string, string> = {
  bpcVolume: 'BPC-交易量',
  bpcSuccess: 'BPC-成功率',
  bpcResponse: 'BPC-响应率',
  bpcResponseTime: 'BPC-平均响应耗时',
};

export const IndicatorMap: Record<string, string> = {
  CPU: 'CPU使用率',
  MEMORY: '内存使用率',
  DISK: '磁盘使用率',
  IOPS: '磁盘读写',
  TRAFFIC: '网卡出入流量',
};
export const DbIndicatorMap: Record<string, string> = {
  CURRENT_SESSION: '数据库当前会话数',
  ACTIVE_SESSION: '数据库活动会话数',
};
export const otherIndicator = {
  BPC: 'BPC',
};
