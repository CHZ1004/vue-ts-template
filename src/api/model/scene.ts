interface BaseSceneInfo {
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
}

export interface SceneGroup extends BaseSceneInfo {
  groupId: string;
  groupName: string;
  groupType: string;
  count: number;
}

export interface Scene extends BaseSceneInfo {
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
