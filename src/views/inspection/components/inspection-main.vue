<template>
  <main class="flex-1 flex flex-col overflow-hidden">
    <div :class="{ 'pl-12': collapse }">
      <custom-header v-model:value="params.inspectionName" />
    </div>
    <n-spin :show="loading" class="flex-1 my-4 overflow-y-auto">
      <div class="grid grid-cols-4 gap-4">
        <Card
          v-for="card in data.records"
          :key="card.templateId"
          :data="card"
          label="inspectionName"
          value="inspectionId"
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
import { useInspectionMain } from '../hooks';

interface Props {
  groupId: string;
}
const props = defineProps<Props>();
const { groupId } = toRefs(props);
const { params, data, loading, collapse, onEdit, onCopy, onDelete, onMove } = useInspectionMain(groupId);
</script>
<style scoped></style>
