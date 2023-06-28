<template>
  <div>
    <a-card class="w-68 h-full">
      <Search v-model="searchValue" @on-add="onAdd" />
      <List :list-data="listData" @on-update="onUpdate" @on-delete="onDelete"></List>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRequest } from 'alova';
import { getCombinationList, addCombination, deleteCombination, UpdateCombination } from '@/api';
import type { Combination } from '@/api';
import { successMessage } from '@/utils';
import { Search, List } from './components';

const { data, send } = useRequest(getCombinationList, { initialData: [] });
const searchValue = ref('');

// TODO 添加防抖
const listData = computed(() => {
  return data.value.filter((item) => (item.combinationName || '').includes(searchValue.value));
});

const onAdd = async (name: string, reset: () => void) => {
  await addCombination(name).send();
  successMessage('添加成功！');
  await send();
  reset();
};
const onUpdate = async ({ data, reset }: { data: Combination; reset: () => void }) => {
  console.log('🚀 ~ reset:', reset);
  await UpdateCombination(data).send();
  successMessage('修改成功！');
  await send();
  reset();
};
const onDelete = async (id: string) => {
  await deleteCombination(id).send();
  successMessage('删除成功！');
  await send();
};
</script>
<style></style>
