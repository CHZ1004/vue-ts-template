<template>
  <header class="flex">
    <n-space class="w-full">
      <n-button type="primary">
        <template #icon>
          <icon-mdi:plus class="text-2xl" />
        </template>
        新建
      </n-button>
      <n-input v-model:value="searchValue" placeholder="请输入场景名称" />
      <n-button type="primary" ghost @click="oper('')">重置</n-button>
      <n-button type="primary" @click="oper(searchValue)">搜索</n-button>
    </n-space>
  </header>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['update:value', 'add']);
interface Props {
  value: string;
}
const props = defineProps<Props>();
const searchValue = ref(props.value || '');
const oper = (value: string) => {
  searchValue.value = value;
  emit('update:value', value);
};
</script>
<style scoped></style>
