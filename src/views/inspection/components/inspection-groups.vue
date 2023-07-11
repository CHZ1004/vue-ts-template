<template>
  <Groups
    v-model:value="groupId"
    v-model:shrink="shrink"
    :loading="loading"
    :list-data="groups"
    @search="onSearch"
    @update="onUpdate"
    @delete="onDelete"
  />
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRequest } from 'alova';
import { Group, deleteInspectionGuoup, editInspectionGuoup, getInspectionGroups } from '@/api';
import { successMessage, events, EventType } from '@/utils';

interface Props {
  value: string;
}
const emit = defineEmits(['update:value']);
const props = defineProps<Props>();
// TODO 分组数据获取考虑使用其它方式代替 没必要每次进入都获取
const { loading: getLoading, send, onSuccess } = useRequest((name: string) => getInspectionGroups(name));
const { loading: updateLoading, send: updateSend } = useRequest((data) => editInspectionGuoup(data), {
  immediate: false,
});
const { loading: deleteLoading, send: deleteSend } = useRequest((id) => deleteInspectionGuoup(id), {
  immediate: false,
});

const shrink = ref(false);
watch(
  () => shrink.value,
  (value) => {
    events.emit(EventType.GroupShrink, value);
  },
);
const groupId = computed({
  set(value: string) {
    emit('update:value', value);
  },
  get() {
    return props.value;
  },
});

const loading = computed(() => {
  return getLoading.value || updateLoading.value || deleteLoading.value;
});
const groups = ref<Group[]>([]);
onSuccess(({ data }) => {
  events.emit(EventType.SceneGroup, data);
  groups.value = data;
});
events.on(EventType.RefreshSceneGroup, () => {
  send(tempValue.value);
});
const tempValue = ref('');
const onSearch = async (value: string) => {
  tempValue.value = value;
  await send(value);
};
const onUpdate = async (data: Partial<Group>) => {
  await updateSend(data);
  await send(tempValue.value);
  successMessage('编辑成功');
};
const onDelete = async (id: string) => {
  await deleteSend(id);
  await send(tempValue.value);
  successMessage('删除成功');
  /** 删除当前选中分组时, 自动切换到全部应用 */
  id === groupId.value && emit('update:value', '');
};
</script>
<style scoped></style>
