<template>
  <div v-for="item in listData" :key="item.id" :class="classes(item.id)" @click="currentGroupId = item.id">
    <Item :data="item" @on-update="$emit('onUpdate', $event)" @on-delete="$emit('onDelete', $event)" />
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Combination } from '@/api';
import Item from './item.vue';

interface IProps {
  listData?: Combination[];
}
const emit = defineEmits<{
  (e: 'onUpdate', { data, reset }: { data: Combination; reset: () => void }): void;
  (e: 'onDelete', id: string): void;
  (e: 'change', id: string): void;
}>();
const props = withDefaults(defineProps<IProps>(), { listData: () => [] });
const currentGroupId = ref('');
const classes = computed(() => {
  const baseClass = 'h-10 flex items-center justify-end hover:text-primary';
  return (id: string) => {
    return `${baseClass} ${currentGroupId.value === id ? 'text-primary' : ''}`;
  };
});
watch(
  () => props.listData,
  (data) => {
    data.length && (currentGroupId.value = data[0].id);
  },
  {
    immediate: true,
  },
);
watch(
  () => currentGroupId.value,
  (id: string) => {
    id && emit('change', id);
  },
  {
    immediate: true,
  },
);
</script>
<style scoped></style>
