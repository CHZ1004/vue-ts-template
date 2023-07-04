interface BaseInspectionInfo {
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
}

export interface InspectionGroup extends BaseInspectionInfo {
  groupId: string;
  groupName: string;
  groupType: string;
  count: number;
}

export interface Inspection extends BaseInspectionInfo {
  templateId: string;
  templateName: string;
  enableStatus: string;
  groupId: string;
  delFlag: string;
  templateTime: string;
  timeType: string;
  templateData: string;
  displayType: string;
  granularity: string;
}
