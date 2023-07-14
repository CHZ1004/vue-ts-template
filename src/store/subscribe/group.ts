import { RouteRecordName } from 'vue-router';
import { SCENE, INSPECTION } from '@/router';

type RouteName = RouteRecordName | null | undefined;

/** 订阅分组 */
export default function subscribeGroupStore() {
  const scope = effectScope();
  const route = useRoute();
  const group = useGroupStore();
  scope.run(() => {
    watch(
      () => route.name,
      async (name: RouteName) => {
        if (name === SCENE) {
          group.groupType = SCENE;
          if (!group.sceneGroups.length) {
            group.sendGroups();
          }
        }
        if (name === INSPECTION) {
          group.groupType = INSPECTION;
          if (!group.inspectionGroups.length) {
            group.sendGroups();
          }
        }
      },
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });
}
