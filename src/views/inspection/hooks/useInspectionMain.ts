import { useRequest } from 'alova';
import {
  Inspection,
  Group,
  getPageInspection,
  inspectionCopy,
  inspectionDelete,
  inspectionMove,
  inspectionSave,
} from '@/api';
import { successMessage, events, EventType } from '@/utils';
import { useMoveDialog } from '@/hooks';

export function useInspectionMain(groupId: globalThis.Ref<string>) {
  const params = ref({
    inspectionName: '',
    page: 1,
    pageSize: 20,
    groupId: groupId.value,
  });

  const { data, loading, send } = useRequest(() => getPageInspection(params.value), {
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
  const onEdit = async (value: Inspection) => {
    await inspectionSave(value).send();
    finishing('编辑成功', false);
  };
  const onCopy = async (id: string) => {
    await inspectionCopy(id).send();
    finishing('复制成功');
  };
  const onDelete = async (id: string) => {
    await inspectionDelete(id).send();
    finishing('删除成功');
  };

  const { open } = useMoveDialog({
    options: group.sceneGroups,
    success: async (data: Partial<Group>) => {
      await inspectionMove(data).send();
      finishing('编辑成功');
    },
  });
  const onMove = (data: Inspection) => {
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
