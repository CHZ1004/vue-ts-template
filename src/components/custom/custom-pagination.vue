<template>
  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :item-count="count || 0"
    :page-sizes="[10, 20, 30, 40, 50]"
    :page-slot="7"
    show-quick-jumper
    show-size-picker
    class="ml-auto"
  >
    <template #prefix="{ itemCount }">共{{ itemCount }}条</template>
  </n-pagination>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  page: number;
  pageSize: number;
  count: number;
}
const emit = defineEmits(['update:page', 'update:pageSize']);
const props = defineProps<Props>();

const page = computed({
  set(value) {
    emit('update:page', value);
  },
  get() {
    return props.page || 0;
  },
});
const pageSize = computed({
  set(value) {
    emit('update:pageSize', value);
  },
  get() {
    return props.pageSize || 0;
  },
});
</script>
<style scoped></style>
