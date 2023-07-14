import {
  deleteInspectionGuoup,
  deleteSceneGuoup,
  editInspectionGuoup,
  editSceneGuoup,
  getInspectionGroups,
  getSceneGroups,
} from '@/api';

export const GroupTypeMap = {
  SCENE: {
    title: 'sceneGroups',
    send: getSceneGroups,
    update: editSceneGuoup,
    delete: deleteSceneGuoup,
  },
  INSPECTION: {
    title: 'inspectionGroups',
    send: getInspectionGroups,
    update: editInspectionGuoup,
    delete: deleteInspectionGuoup,
  },
};
