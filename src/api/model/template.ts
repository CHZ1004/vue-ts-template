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

export interface Scene extends BaseResponseInfo {
  templateId: string;
  templateName: string;
  templateTime: string;
  templateData: string;
  enableStatus: string;
  groupId: string;
  delFlag: string;
  timeType: string;
  displayType: string;
  granularity: string;
}
