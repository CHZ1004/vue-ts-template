import { alovaInstance } from '@/utils';

enum Api {
  Es = 'es/search',
  EsBpc = 'es/search-bpc',
  EsDb = 'es/search-db',
}

export interface EsParams {
  ipList: string[];
  type: string;
  startTime: string;
  endTime: string;
  interval: string;
  capSpv?: string;
}

export const bpcColumn: Record<string, string> = {
  bpcVolume: 'trans_count_total',
  bpcSuccess: 'succ_p',
  bpcResponse: 'resp_p',
  bpcResponseTime: 'duration_avg',
};

type HandleEsDataType = {
  list: Record<string, any>[];
  options: Record<string, string>;
};
export interface EsResponse {
  time: string;
  ipGroup: {
    key: string;
    value: string;
  }[];
}
const handleGroup = (buckets: Record<string, any>[], key: string, value: string) => {
  return buckets.map((bucket: Record<string, any>) => {
    const _key: string = bucket[key] ?? '-';
    const _value: string = bucket[value] ?? '-';
    return {
      key: _key,
      value: _value,
    };
  });
};
const handleEsData = ({ list, options }: HandleEsDataType): EsResponse[] => {
  const { group, key, value, time } = options;
  return list.map((item) => {
    const buckets = item[group].buckets ?? [];
    const ipGroup = handleGroup(buckets, key, value);
    return {
      time: item[time] ?? '',
      ipGroup,
    };
  });
};

/** 查询CPU、DISK、MEMORY等数据 */
export const getEs = (data: EsParams) => {
  return alovaInstance.Post<Record<string, any>>(Api.Es, data);
};

/** 查询BPC数据 */
export const getEsBpc = async (data: EsParams, type = '') => {
  const res = await alovaInstance.Post<Record<string, any>>(Api.EsBpc, data).send();
  const key = bpcColumn[type];
  const buckets = res[key].aggregations?.timestamp_group?.buckets || [];
  return handleEsData({
    list: buckets,
    options: {
      value: `${key}Avg`,
      time: 'key_as_string',
      group: 'socp_group',
      key: 'key',
    },
  });
};

/** 查询DB数据 */
export const getEsDb = (data: EsParams) => {
  return alovaInstance.Post<Record<string, any>>(Api.EsDb, data);
};
