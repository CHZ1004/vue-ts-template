import type { Group } from '@/api';
import { successMessage, events, EventType } from '@/utils';

type Emit = (event: 'update:value', ...args: any[]) => void;
export function useInspectionGroups(value: globalThis.Ref<string>, emit: Emit) {
  const { sendGroups, updateGroup, deleteGroup } = useGroupStore();
  const groupId = computed({
    set(value: string) {
      emit('update:value', value);
    },
    get() {
      return value.value;
    },
  });

  events.on(EventType.RefreshGroups, () => {
    sendGroups(tempValue.value);
  });
  const tempValue = ref('');
  const onSearch = async (value: string) => {
    tempValue.value = value;
    sendGroups(value);
  };
  const onUpdate = async (data: Partial<Group>) => {
    await updateGroup(data, tempValue.value);
    successMessage('编辑成功');
  };
  const onDelete = async (id: string) => {
    await deleteGroup(id, tempValue.value);
    successMessage('删除成功');
    /** 删除当前选中分组时, 自动切换到全部应用 */
    id === groupId.value && emit('update:value', '');
  };
  return {
    groupId,
    onSearch,
    onUpdate,
    onDelete,
  };
}
