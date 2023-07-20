<template>
  <a-spin :spinning="loading">
    <div class="grid grid-cols-3 gap-4 min-h-100">
      <VChart v-for="(chart, index) in inventoryCharts" :key="index" class="h-50" :option="chart" autoresize />
    </div>
  </a-spin>
</template>
<script setup lang="ts">
import VChart from 'vue-echarts';
import { DailyParams, getDealAllRequest } from '@/api';
import { ChartTitles, createChartOption, XMap } from '@/views/daily/helpers';

interface Props {
  model: DailyParams;
}
const props = defineProps<Props>();
const inventoryCharts = ref(ChartTitles.map((title) => createChartOption(title)));
const loading = ref(false);

const init = async () => {
  loading.value = true;
  const data = await getDealAllRequest(props.model);
  data.forEach((item, index) => {
    inventoryCharts.value[index].series[0].data = Object.values(item);
    inventoryCharts.value[index].xAxis[0].data = Object.keys(item).map((key) => XMap[key]);
  });
  loading.value = false;
};
nextTick(() => {
  init();
});
watch(
  () => props.model,
  () => {
    init();
  },
  {
    deep: true,
  },
);
</script>
<style scoped></style>
