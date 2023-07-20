export interface DailyParams {
  date: string;
  id?: string;
  unit?: string;
  calibre?: string;
}

export interface DailyProvince {
  stock: string;
  number: string;
  firm: string;
  province: string;
  name?: string;
  index?: number;
  value?: string;
}
