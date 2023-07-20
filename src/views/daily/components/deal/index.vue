<template>
  <a-card title="当日交易情况" size="small" class="flex-1">
    <template #extra>
      <div class="flex gap-2">
        <a-button type="primary" @click="download">下载</a-button>
        <a-input :value="deal" addon-before="当日买入量" readonly />
      </div>
    </template>
    <InventoryCharts :model="model" />
    <InventoryMap :model="model" />
  </a-card>
</template>
<script setup lang="ts">
import { stringify } from 'qs';
import { DailyParams, downloadTransactionSubmission, getBuyTheDay } from '@/api';
import { InventoryCharts, InventoryMap } from './components';

interface Props {
  model: DailyParams;
}
const props = defineProps<Props>();

const { data: deal } = useRequest(() => getBuyTheDay(props.model));

const download = () => {
  const { baseURL, url } = downloadTransactionSubmission(props.model);
  const herf = `${baseURL}${url}?${stringify(props.model)}`;
  window.open(herf, '_self');
  console.log('🚀 ~ herf:', herf);
};
</script>
<style scoped>
:deep(.ant-card-body) {
  height: calc(100% - 50px);
  overflow-y: auto;
}
</style>
