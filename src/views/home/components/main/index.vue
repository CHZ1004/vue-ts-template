<template>
  <n-grid ref="chartCardsBox" x-gap="16" :cols="12" class="overflow-y-auto">
    <n-gi v-for="card in chartCards" :key="card.key" :span="12 / cols">
      <Charts :height="height" :card-data="chartCard(card)" />
    </n-gi>
  </n-grid>
</template>
<script setup lang="ts">
import { connect } from 'echarts/core';
import type { Scene, SceneTemplate } from '@/api';
import Charts from './components/Charts.vue';

connect('chartID');
interface Props {
  data: Scene;
}
const props = defineProps<Props>();
const chartCards = computed(() => JSON.parse(props.data.templateData as string));
const cols = computed(() => chartCards.value.length || 0);
const handelTime = (time?: string) => {
  if (!time) return [];
  return time.split('TO');
};
const chartCard = (card: SceneTemplate) => {
  const [startTime, endTime] = handelTime(card.time || props.data?.templateTime);
  const interval = card.granularity || props.data?.granularity;
  return {
    ...card,
    startTime,
    endTime,
    interval,
  };
};

const chartCardsBox = ref<HTMLDivElement | null>(null);
const { height } = useElementSize(chartCardsBox);
</script>
<style scoped>
:deep(.n-card__content) {
  --n-padding-bottom: 16px;
  --n-padding-left: 16px;
}
</style>
