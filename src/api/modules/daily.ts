import { alovaInstance } from '@/utils';
import { DailyParams, DailyProvince } from '../models';

enum Api {
  FindPositionScale = 'cityInvestmentDaily/findPositionScale',
  ExternalRatings = 'cityInvestmentDaily/externalRatings',
  InternalRatings = 'cityInvestmentDaily/internalRatings',
  ImpliedRatings = 'cityInvestmentDaily/impliedRatings',
  TermDistribution = 'cityInvestmentDaily/termDistribution',
  FiscalHierarchy = 'cityInvestmentDaily/fiscalHierarchy',
  ProvinceDistribution = 'cityInvestmentDaily/provinceDistribution',
  PositionReporting = 'cityInvestmentDaily/positionReporting',
  BuyTheDay = 'cityInvestmentDaily/buyTheDay',
  TradeExternalRatings = 'cityInvestmentDaily/tradeExternalRatings',
  TradeInternalRatings = 'cityInvestmentDaily/tradeInternalRatings',
  TradeImpliedRatings = 'cityInvestmentDaily/tradeImpliedRatings',
  TradeTermDistribution = 'cityInvestmentDaily/tradeTermDistribution',
  TradeFiscalHierarchy = 'cityInvestmentDaily/tradeFiscalHierarchy',
  TradeProvinceDistribution = 'cityInvestmentDaily/tradeProvinceDistribution',
  TransactionSubmission = 'cityInvestmentDaily/transactionSubmission',
}
// localhost:10003/cityInvestmentDaily/transactionSubmission?date=2021-06-16&id=1&unit=1&calibre=1
// localhost:10003/cityInvestmentDaily/positionReporting?date=2019-06-16&id=1&unit=1&calibre=1
/** 存量持仓情况 */
/** 获取存量持仓规模 */
export const getFindPositionScale = (params: DailyParams) => {
  return alovaInstance.Get<string>(Api.FindPositionScale, { params });
};

/** 外部主体评级 */
export const getExternalRatings = (params: DailyParams) => {
  return alovaInstance.Get<Record<string, string>>(Api.ExternalRatings, { params });
};

/** 内部主体评级 */
export const getInternalRatings = (params: DailyParams) => {
  return alovaInstance.Get<Record<string, string>>(Api.InternalRatings, { params });
};

/** 债券中债隐含评级 */
export const getImpliedRatings = (params: DailyParams) => {
  return alovaInstance.Get<Record<string, string>>(Api.ImpliedRatings, { params });
};

/** 期限分布 */
export const getTermDistribution = (params: DailyParams) => {
  return alovaInstance.Get<Record<string, string>>(Api.TermDistribution, { params });
};

/** 财政层级分布 */
export const getFiscalHierarchy = (params: DailyParams) => {
  return alovaInstance.Get<Record<string, string>>(Api.FiscalHierarchy, { params });
};
export const getInventoryAllRequest = async (params: DailyParams) => {
  return Promise.all([
    getExternalRatings(params).send(),
    getInternalRatings(params).send(),
    getImpliedRatings(params).send(),
    getTermDistribution(params).send(),
    getFiscalHierarchy(params).send(),
  ]);
};

/** 获取省份数据 */
export const getProvinceDistribution = (params: DailyParams) => {
  return alovaInstance.Get<DailyProvince[]>(Api.ProvinceDistribution, { params });
};

/** 持仓明细下载 */
export const downloadPositionReporting = (params: DailyParams) => {
  return alovaInstance.Get(Api.PositionReporting, { params });
};

/** 当日交易情况 */

/** 获取当日买入量 */
export const getBuyTheDay = (params: DailyParams) => {
  return alovaInstance.Get<string>(Api.BuyTheDay, { params });
};

/** 外部主体评级 */
export const getTradeExternalRatings = (params: DailyParams) => {
  return alovaInstance.Get<Record<string, string>>(Api.TradeExternalRatings, { params });
};

/** 内部主体评级 */
export const getTradeInternalRatings = (params: DailyParams) => {
  return alovaInstance.Get<Record<string, string>>(Api.TradeInternalRatings, { params });
};

/** 债券中债隐含评级 */
export const getTradeImpliedRatings = (params: DailyParams) => {
  return alovaInstance.Get<Record<string, string>>(Api.TradeImpliedRatings, { params });
};

/** 期限分布 */
export const getTradeTermDistribution = (params: DailyParams) => {
  return alovaInstance.Get<Record<string, string>>(Api.TradeTermDistribution, { params });
};

/** 财政层级分布 */
export const getTradeFiscalHierarchy = (params: DailyParams) => {
  return alovaInstance.Get<Record<string, string>>(Api.TradeFiscalHierarchy, { params });
};
export const getDealAllRequest = async (params: DailyParams) => {
  return Promise.all([
    getTradeExternalRatings(params).send(),
    getTradeInternalRatings(params).send(),
    getTradeImpliedRatings(params).send(),
    getTradeTermDistribution(params).send(),
    getTradeFiscalHierarchy(params).send(),
  ]);
};

/** 获取省份数据 */
export const getTradeProvinceDistribution = (params: DailyParams) => {
  return alovaInstance.Get<DailyProvince[]>(Api.TradeProvinceDistribution, { params });
};

/** 交易明细下载 */
export const downloadTransactionSubmission = (params: DailyParams) => {
  return alovaInstance.Get(Api.TransactionSubmission, { params });
};
