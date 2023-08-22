<template>
  <div ref="chartCard" class="wh-full grid gap-4 overflow-hidden">
    <n-card
      v-for="chart in cardData.dataList"
      :key="chart.key"
      class="rounded-md"
      :style="{ width: `${width}px`, height: chartHeight }"
    >
      <ChartItem v-if="chartHeight && width" :data="chartData(chart)" />
    </n-card>
  </div>
</template>
<script setup lang="ts">
import { isString } from 'lodash-es';
import type { SceneTemplate, SceneTemplateItem } from '@/api';
import ChartItem from './Chart.vue';

type CardData = SceneTemplate & {
  startTime: string;
  endTime: string;
  interval: string;
};
interface Props {
  cardData: CardData;
  height: number;
}
const props = defineProps<Props>();
const chartHeight = computed(() => `${(props.height - 32) / 3}px`);

const chartCard = ref<HTMLDivElement | null>(null);
const { width } = useElementSize(chartCard);

const chartData = ({ key, indicator, type }: SceneTemplateItem) => {
  const { startTime, endTime, ips, interval, systemName, capSpv } = props.cardData;
  const capSpvLabels = isString(capSpv) ? JSON.parse(capSpv) : [];
  return {
    key,
    indicator: indicator ?? '',
    type: type ?? '',
    systemName,
    startTime,
    endTime,
    interval,
    ipList: ips,
    capSpv: capSpvLabels,
  };
};
</script>
<style scoped></style>
