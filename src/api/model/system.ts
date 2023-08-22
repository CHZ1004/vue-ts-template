export interface System {
  systemId: string;
  systemName: string;
  systemType: string;
  capSpv: string;
  capSpvFlag: string;
  systemIdName?: string;
  isBPC?: boolean;
  createBy: string;
  createTime?: string;
  updateBy: string;
  updateTime?: string;
}
export interface SystemDetailIps {
  addressId: string;
  addressIp: string;
  addressName: string;
  systemId: string;
}
export interface SystemDetail {
  systemId: string;
  systemName: string;
  systemType: string;
  addressList: SystemDetailIps[];
}
