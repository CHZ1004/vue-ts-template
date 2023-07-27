import { DisplayTypeEnum } from '@/enums';

interface BaseResponseInfo extends Record<string, any> {
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
}

export interface Group extends BaseResponseInfo {
  groupId: string;
  groupName: string;
  groupType: string;
  count: number;
}

export interface Inspection extends BaseResponseInfo {
  inspectionId: string;
  inspectionName: string;
  inspectionTime: string;
  inspectionData: string;
  enableStatus: string;
  groupId: string;
  delFlag: string;
  timeType: string;
  displayType: string;
  granularity: string;
}

// export enum DisplayTypeEnum {
//   system = 'system',
//   time = 'time',
// }
export interface SceneTemplate {
  key: string;
  system: string | null;
  systemName: string;
  ips: string[];
  ipIdList: string[] | null;
  capSpv?: string;
  time?: string;
  granularity?: string;
  timeType?: string;
  dataList: {
    key: string;
    indicator?: string | null;
    type?: string | null;
  }[];
}
export interface Scene extends BaseResponseInfo {
  templateId?: string;
  templateName: string;
  templateTime: string;
  templateData: SceneTemplate[] | string;
  enableStatus?: string;
  groupId?: string;
  delFlag?: string;
  timeType: 'fixation' | 'dynamic' | string;
  displayType: DisplayTypeEnum;
  granularity: string;
}
