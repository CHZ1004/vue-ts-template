import { alovaInstance } from '@/utils';
import type { VolatilityItem, VolatilityParams, VolatilityResponse } from '../models';

enum Api {
  Volatility = 'earningsVolatility/findVolatilityByCombination',
  Download = 'earningsVolatility/download',
  Echarts = 'earningsVolatility/findVolatility',
}

/** 获取专户报告列表 */
export function getVolatilityByCombination(params: VolatilityParams) {
  return alovaInstance.Get<VolatilityResponse[]>(Api.Volatility, { params });
}

/** 下载报告列表 */
export function downloadVolatility(params: VolatilityParams) {
  return alovaInstance.Get<VolatilityResponse[]>(Api.Download, { params });
}

/** 指定禅定净值增长率 */
export function getFindVolatility(params: VolatilityParams) {
  return alovaInstance.Get<VolatilityItem[]>(Api.Echarts, { params });
}
