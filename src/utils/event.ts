import mitt from 'mitt';

type Events = {
  RefreshGroups: void;
};
export enum EventType {
  RefreshGroups = 'RefreshGroups',
}
export const events = mitt<Events>();
