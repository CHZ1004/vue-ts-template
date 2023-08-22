export interface BaseResponseInfo extends Record<string, any> {
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
}

export interface Page {
  page: number;
  pageSize: number;
  [key: string]: string | number;
}

export interface PageResponse<T = any> {
  current: number;
  pages: number;
  records: T[];
  size: number;
  total: number;
}
