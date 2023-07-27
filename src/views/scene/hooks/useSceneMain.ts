import { useRequest } from 'alova';
import { Scene, Group, getPageScenes, sceneCopy, sceneDelete, sceneMove, sceneSave } from '@/api';
import { successMessage, events, EventType } from '@/utils';
import { useMoveDialog, useSceneDialog } from '@/hooks';
// import SceneModel from '@/components/custom/sceneModel/index.vue';

export function useSceneMain(groupId: globalThis.Ref<string>) {
  const params = ref({
    templateName: '',
    page: 1,
    pageSize: 20,
    groupId: groupId.value,
  });

  const { data, loading, send } = useRequest(() => getPageScenes(params.value), {
    initialData: { records: [], total: 0 },
  });
  watch(
    () => groupId.value,
    (id) => {
      params.value.groupId = id;
    },
  );
  watch(
    () => params.value,
    () => {
      send();
    },
    {
      deep: true,
    },
  );
  const group = useGroupStore();

  const finishing = async (msg: string, isRefresh = true) => {
    await send();
    successMessage(msg);
    isRefresh && events.emit(EventType.RefreshGroups);
  };

  const { open: sceneOpen } = useSceneDialog({
    success: async (res) => {
      await sceneSave(res).send();
      successMessage('新增成功');
    },
    options: {
      title: '新增场景',
      style: { width: '60vw' },
    },
  });
  const onEdit = async (id: string) => {
    sceneOpen({ id });
    // console.log('🚀 ~ id:', id);
    // await sceneSave(value).send();
    // finishing('编辑成功', false);
  };
  const onCopy = async (id: string) => {
    await sceneCopy(id).send();
    finishing('复制成功');
  };
  const onDelete = async (id: string) => {
    await sceneDelete(id).send();
    finishing('删除成功');
  };

  const { open } = useMoveDialog({
    options: group.sceneGroups,
    success: async (data: Partial<Group>) => {
      await sceneMove(data).send();
      finishing('编辑成功');
    },
  });
  const onMove = (data: Scene) => {
    open(data);
  };
  return {
    params,
    data,
    loading,
    collapse: group.inspectionCollapse,
    onEdit,
    onCopy,
    onDelete,
    onMove,
  };
}
