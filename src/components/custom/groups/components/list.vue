<template>
  <Item
    v-for="group in listData"
    :key="group.groupId"
    v-model:value="current"
    :group-data="group"
    @update="$emit('update', $event)"
    @delete="$emit('delete', $event)"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { Group } from '@/api';
import Item from './item.vue';

interface Props {
  value: string;
  listData: Group[];
}
const emit = defineEmits(['update', 'delete', 'update:value']);
const props = defineProps<Props>();
const current = computed({
  set(value: string) {
    emit('update:value', value);
  },
  get() {
    return props.value;
  },
});
</script>
<style lang="less" scoped></style>
