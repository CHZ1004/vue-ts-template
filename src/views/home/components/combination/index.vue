<template>
  <a-card :body-style="{ height: 'calc(100% - 64px)' }">
    <template #title>
      <upload accept=".xml,.xlsx" @change="uploading">Excel上传</upload>
      <a-button class="ml-4" @click="send(combinationId)">重置</a-button>
    </template>
    <a-transfer
      v-model:target-keys="targetKeys"
      :row-key="(item: CombinationItem) => item.code"
      class="h-full"
      :titles="['未绑定', '已绑定']"
      :data-source="listData"
      show-search
      :list-style="{ height: '100%', flex: 1 }"
      :render="(item: CombinationItem) => item.name"
      @change="handleChange"
    />
  </a-card>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRequest } from 'alova';
import { getCombinationDetail, bindCombination, uploadExcel } from '@/api';
import type { CombinationItem } from '@/api';

const props = defineProps<{
  combinationId: string;
}>();
const { data, send } = useRequest(getCombinationDetail, { immediate: false });
const targetKeys = ref<string[]>([]);

watch(
  () => props.combinationId,
  async (id) => {
    if (!id) return;
    await send(id);
    targetKeys.value = data.value.bound.map((item) => item.code);
  },
  {
    immediate: true,
  },
);
const listData = computed(() => {
  if (data.value) {
    return [...data.value.unBound, ...data.value.bound];
  }
  return [];
});
const handleChange = async (keys: string[]) => {
  const list = listData.value
    .filter((item) => keys.includes(item.code))
    .map((item) => {
      return {
        combinationId: props.combinationId,
        code: item.code,
        name: item.name,
      };
    });
  await bindCombination(list).send();
};

const uploading = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;
  const file = target.files[0];
  const formData = new FormData();
  formData.append('id', props.combinationId);
  formData.append('file', file);
  try {
    const res = await uploadExcel(formData).send();
    console.log('🚀 ~ res:', res);
  } catch (error) {
    /**  */
  }
};
</script>
<style scoped></style>
