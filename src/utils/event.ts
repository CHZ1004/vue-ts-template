import mitt from 'mitt';

type HandelrIndicatorType = 'add' | 'minus' | 'update' | string;
type Events = {
  RefreshGroups: void;
  HandelrIndicator: { type: HandelrIndicatorType; index: number; data?: any };
};
export enum EventType {
  RefreshGroups = 'RefreshGroups',
  HandelrIndicator = 'HandelrIndicator',
}
export const events = mitt<Events>();
