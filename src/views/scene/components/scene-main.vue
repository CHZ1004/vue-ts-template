<template>
  <main class="flex-1 flex flex-col overflow-hidden">
    <div :class="{ 'pl-12': collapse }">
      <custom-header v-model:value="params.templateName" />
    </div>
    <n-spin :show="loading" class="flex-1 my-4 overflow-y-auto">
      <n-grid x-gap="16" y-gap="16" cols="1 500:2 750:3 1000:4">
        <n-grid-item v-for="card in data.records" :key="card.templateId">
          <Card :data="card" @edit="onEdit" @copy="onCopy" @delete="onDelete" @move="onMove" />
        </n-grid-item>
      </n-grid>
      <!-- <div class="grid grid-cols-4 gap-4">
        <Card
          v-for="card in data.records"
          :key="card.templateId"
          :data="card"
          @edit="onEdit"
          @copy="onCopy"
          @delete="onDelete"
          @move="onMove"
        />
      </div> -->
    </n-spin>
    <custom-pagination v-model:page="params.page" v-model:page-size="params.pageSize" :count="data.total" />
  </main>
</template>
<script setup lang="ts">
import { useSceneMain } from '../hooks';

interface Props {
  groupId: string;
}
const props = defineProps<Props>();
const { groupId } = toRefs(props);
const { params, data, loading, collapse, onEdit, onCopy, onDelete, onMove } = useSceneMain(groupId);
</script>
<style scoped></style>
