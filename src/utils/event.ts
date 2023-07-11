import mitt from 'mitt';
import type { Group } from '@/api';

type Events = {
  SceneGroup: Group[];
  RefreshSceneGroup: void;
  GroupShrink: boolean;
};
export enum EventType {
  SceneGroup = 'SceneGroup',
  RefreshSceneGroup = 'RefreshSceneGroup',
  GroupShrink = 'GroupShrink',
}
export const events = mitt<Events>();
