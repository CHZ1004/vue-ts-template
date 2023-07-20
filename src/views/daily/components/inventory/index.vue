<template>
  <a-card title="存量持仓情况" size="small" class="flex-1">
    <template #extra>
      <div class="flex gap-2">
        <a-button type="primary" @click="download">下载</a-button>
        <a-input :value="scale" addon-before="存量持仓规模" readonly />
      </div>
    </template>
    <InventoryCharts :model="model" />
    <InventoryMap :model="model" />
  </a-card>
</template>
<script setup lang="ts">
import { stringify } from 'qs';
import { DailyParams, downloadPositionReporting, getFindPositionScale } from '@/api';
import { InventoryCharts, InventoryMap } from './components';

interface Props {
  model: DailyParams;
}
const props = defineProps<Props>();

const { data: scale } = useRequest(() => getFindPositionScale(props.model));

const download = () => {
  const { baseURL, url } = downloadPositionReporting(props.model);
  const herf = `${baseURL}${url}?${stringify(props.model)}`;
  window.open(herf, '_self');
};
</script>
<style scoped>
:deep(.ant-card-body) {
  height: calc(100% - 50px);
  overflow-y: auto;
}
</style>
