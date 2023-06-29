<template>
  <a-table
    bordered
    :loading="loading"
    :pagination="false"
    :custom-row="customRow"
    :data-source="data"
    :columns="columns"
  />
</template>
<script setup lang="ts">
import { watch } from 'vue';
import { useRequest } from 'alova';
import { getVolatilityByCombination } from '@/api';
import type { VolatilityParams, VolatilityResponse } from '@/api';

const props = defineProps<{
  params?: VolatilityParams;
}>();
const { loading, data, send } = useRequest(() => getVolatilityByCombination(props.params!), {
  immediate: false,
});
const customRow = (record: VolatilityResponse) => {
  return {
    onclick: () => {
      console.log('xxx', record.code);
    },
  };
};
const columns = [
  {
    title: '产品代码',
    dataIndex: 'code',
    key: 'code',
    width: 100,
  },
  {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '净值增长率',
    dataIndex: 'growthRate',
    key: 'growthRate',
  },
  {
    title: '波动率',
    dataIndex: 'volatility',
    key: 'volatility',
  },
];
watch(
  () => props.params,
  async (data) => {
    await send(data);
  },
);
</script>
<style lang="less" scoped></style>
