export interface SceneGuoup {
  groupId: string;
  groupName: string;
  groupType: string;
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  count: number;
}

export interface Scene {
  templateId: string;
  templateName: string;
  enableStatus: string;
  groupId: string;
  delFlag: string;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
}
