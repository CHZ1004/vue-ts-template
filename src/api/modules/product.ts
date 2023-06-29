import { alovaInstance } from '@/utils';
import type { VolatilityItem, VolatilityParams, VolatilityResponse } from '../models';

enum Api {
  Volatility = 'earningsVolatility/findVolatilityByCombination',
  Download = 'earningsVolatility/download',
  Echarts = 'earningsVolatility/findVolatility',
}

export function getVolatilityByCombination(params: VolatilityParams) {
  return alovaInstance.Get<VolatilityResponse[]>(Api.Volatility, { params });
}

export function downloadVolatility(params: VolatilityParams) {
  return alovaInstance.Get<VolatilityResponse[]>(Api.Download, { params });
}

export function getFindVolatility(params: VolatilityParams) {
  return alovaInstance.Get<VolatilityItem[]>(Api.Echarts, { params });
}
