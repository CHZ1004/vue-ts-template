<template>
  <div class="flex">
    <a-card class="flex-1">
      <template #title>
        <SpecialForm @change="change" />
      </template>
      <SpecialTable :params="tableParams" @row-click="rowClick" />
    </a-card>
    <a-card class="flex-1" :body-style="{ height: '100%' }">
      <SpecialChart :params="tableParams" />
    </a-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { VolatilityParams } from '@/api';
import { SpecialForm, SpecialTable, SpecialChart } from './components';

const tableParams = ref<VolatilityParams>();
const change = (data: VolatilityParams) => {
  tableParams.value = data;
};
const rowClick = (code: string) => {
  tableParams.value &&
    Object.assign(tableParams.value, {
      ...tableParams.value,
      code,
    });
};
</script>
<style lang="less" scoped></style>
