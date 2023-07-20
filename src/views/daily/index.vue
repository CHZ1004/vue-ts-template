<template>
  <div class="flex flex-col">
    <DailyForm :model="model" class="h-12 flex-shrink-0" />
    <div class="flex-1 flex gap-4 overflow-hidden">
      <InventoryCard :model="model" />
      <DealCard :model="model" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { registerMap } from 'echarts/core';
import { DailyParams } from '@/api';
import china from '@/lib/china.json';
import { DailyForm, InventoryCard, DealCard } from './components';

registerMap('china', china as any);

const model = ref<DailyParams>({
  date: '2021-06-16',
  id: '1',
  unit: '1',
  calibre: '4',
});
</script>
<style lang="less" scoped></style>
