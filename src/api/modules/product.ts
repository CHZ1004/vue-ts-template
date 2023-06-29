import { alovaInstance } from '@/utils';
import type { VolatilityParams, VolatilityResponse } from '../models';

enum Api {
  Volatility = 'earningsVolatility/findVolatilityByCombination',
  Download = 'earningsVolatility/download',
}

export function getVolatilityByCombination(params: VolatilityParams) {
  return alovaInstance.Get<VolatilityResponse[]>(Api.Volatility, { params });
}

export function downloadVolatility(params: VolatilityParams) {
  return alovaInstance.Get<VolatilityResponse[]>(Api.Download, { params });
}
