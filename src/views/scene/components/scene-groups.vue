<template>
  <Groups
    :loading="loading"
    :list-data="data"
    @change="onChange"
    @search="onSearch"
    @update="onUpdate"
    @delete="onDelete"
  />
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRequest } from 'alova';
import { SceneGroup, deleteSceneGuoup, editSceneGuoup, getSceneGroups } from '@/api';
import { successMessage } from '@/utils';

const { loading: allLoading, data, send } = useRequest((name: string) => getSceneGroups(name), { initialData: [] });
const { loading: updateLoading, send: updateSend } = useRequest((data) => editSceneGuoup(data), { immediate: false });
const { loading: deleteLoading, send: deleteSend } = useRequest((id) => deleteSceneGuoup(id), { immediate: false });

const loading = computed(() => {
  return allLoading.value || updateLoading.value || deleteLoading.value;
});
const onChange = (id: string) => {
  console.log('🚀 ~ id:', id);
};
const tempValue = ref('');
const onSearch = async (value: string) => {
  tempValue.value = value;
  await send(value);
};
const onUpdate = async (data: Partial<SceneGroup>) => {
  await updateSend(data);
  await send(tempValue.value);
  successMessage('编辑成功');
};
const onDelete = async (id: string) => {
  // TODO 删除当选中分组时，需要设置默认分组并且刷新页面
  await deleteSend(id);
  await send(tempValue.value);
  successMessage('删除成功');
};
</script>
<style scoped></style>
