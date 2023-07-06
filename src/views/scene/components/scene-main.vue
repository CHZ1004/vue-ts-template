<template>
  <main class="flex-1 flex flex-col overflow-hidden">
    <div :class="{ 'pl-12': shrink }">
      <custom-header v-model:value="params.templateName" />
    </div>
    <n-spin :show="loading" class="flex-1 my-4 overflow-y-auto">
      <div class="grid grid-cols-4 gap-4">
        <Card
          v-for="card in data.records"
          :key="card.templateId"
          :data="card"
          @edit="onEdit"
          @copy="onCopy"
          @delete="onDelete"
          @move="onMove"
        />
      </div>
    </n-spin>
    <custom-pagination v-model:page="params.page" v-model:page-size="params.pageSize" :count="data.total" />
  </main>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRequest } from 'alova';
import { Scene, Group, getPageScenes, sceneCopy, sceneDelete, sceneMove, sceneSave } from '@/api';
import { successMessage, events, EventType } from '@/utils';
import useMoveDialog from '@/hooks/useMoveDialog';

interface Props {
  groupId: string;
}
const props = defineProps<Props>();

const params = ref({
  templateName: '',
  page: 1,
  pageSize: 20,
  groupId: props.groupId,
});

const { data, loading, send } = useRequest(() => getPageScenes(params.value), {
  initialData: { records: [], total: 0 },
});
watch(
  () => props.groupId,
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
const options = ref<Group[]>([]);
events.on(EventType.SceneGroup, (data) => {
  options.value = data;
});
const shrink = ref(false);
events.on(EventType.GroupShrink, (value) => {
  shrink.value = value;
});
const onEdit = async (value: Scene) => {
  await sceneSave(value).send();
  await send();
  successMessage('编辑成功');
};
const onCopy = async (id: string) => {
  await sceneCopy(id).send();
  await send();
  successMessage('复制成功');
  events.emit(EventType.RefreshSceneGroup);
};
const onDelete = async (id: string) => {
  await sceneDelete(id).send();
  await send();
  successMessage('删除成功');
  events.emit(EventType.RefreshSceneGroup);
};

const { open } = useMoveDialog({
  options,
  success: async (data: Partial<Group>) => {
    await sceneMove(data).send();
    await send();
    successMessage('编辑成功');
    events.emit(EventType.RefreshSceneGroup);
  },
});
const onMove = (data: Scene) => {
  open(data);
};
</script>
<style scoped></style>
