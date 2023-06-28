<template>
  <div v-for="item in listData" :key="item.id" :class="classes(item.id)" @click="currentGroup = item.id">
    <Item :data="item" @on-update="$emit('onUpdate', $event)" @on-delete="$emit('onDelete', $event)" />
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Item from './item.vue';
import { Combination } from '@/api';

interface IProps {
  listData?: Combination[];
}
defineEmits<{
  (e: 'onUpdate', { data, reset }: { data: Combination; reset: () => void }): void;
  (e: 'onDelete', id: string): void;
}>();
const props = withDefaults(defineProps<IProps>(), { listData: () => [] });
const currentGroup = ref('');
const classes = computed(() => {
  const baseClass = 'h-10 flex items-center justify-end hover:text-primary';
  return (id: string) => {
    return `${baseClass} ${currentGroup.value === id ? 'text-primary' : ''}`;
  };
});
watch(
  () => props.listData,
  (data) => {
    data.length && (currentGroup.value = data[0].id);
  },
  {
    immediate: true,
  },
);
</script>
<style lang="less" scoped></style>
