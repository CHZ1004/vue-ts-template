<template>
  <div class="flex">
    <a-card class="flex-1">
      <template #title>
        <SpecialForm @change="change" />
      </template>
      <SpecialTable :params="tableParams" />
    </a-card>
    <a-card class="flex-1">图表</a-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { VolatilityParams } from '@/api';
import { SpecialForm, SpecialTable } from './components';

const tableParams = ref<VolatilityParams>();

const change = (data: VolatilityParams) => {
  tableParams.value = data;
};
</script>
<style lang="less" scoped></style>
