export interface VolatilityParams {
  id?: string;
  code?: string;
  startDate: string;
  endDate: string;
}
export interface VolatilityResponse {
  code: string;
  name: string;
  volatility: string;
  growthRate: string;
}
