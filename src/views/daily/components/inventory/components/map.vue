<template>
  <div class="relative w-full h-150">
    <VChart class="wh-full" :loading="loading" :option="option" autoresiz></VChart>
    <a-table
      class="absolute bottom-0 left-0"
      size="small"
      bordered
      :pagination="false"
      :data-source="dataSource"
      :columns="columns"
    />
  </div>
</template>
<script setup lang="ts">
import VChart from 'vue-echarts';
import { DailyParams, DailyProvince, getProvinceDistribution } from '@/api';
import { handleProvinceNames, columns } from '@/views/daily/helpers';

interface Props {
  model: DailyParams;
}
const props = defineProps<Props>();
const { loading, onSuccess, send } = useRequest(() => getProvinceDistribution(props.model));
const dataSource = ref<DailyProvince[]>([]);
onSuccess(({ data }) => {
  Array.isArray(data) &&
    data.map((item, index) => {
      const name = handleProvinceNames.includes(item.province) ? `${item.province}市` : item.province;
      item.index = index + 1;
      item.name = name;
      item.value = item.stock;
      return item;
    });
  option.value.series[0].data = data;
  option.value.visualMap.min = Math.floor(Number(data[data.length - 1].stock));
  option.value.visualMap.max = Math.ceil(Number(data[0].stock));
  dataSource.value = data.slice(0, 3);
});
const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  visualMap: {
    min: 0,
    max: 0,
    left: 'right',
    bottom: 'bottom',
    calculable: true,
    seriesIndex: [0],
    inRange: {
      color: ['rgba(24, 144, 255, 0.4)', 'rgba(24, 144, 255, 0.8)'],
    },
    textStyle: {
      color: 'rgb(24, 144, 255)',
    },
  },
  geo: {
    show: true,
    map: 'china',
    zoom: 1.2,
    roam: true, // 开启移动和缩放
    tooltip: {
      trigger: 'item',
      formatter: ({ data }: { data: { name: string; stock: string; number: string; firm: string } }) => {
        if (!data) return '';
        return `<div>
          <div style="color: var(--ant-primary-color);">${data.name}</div>
          <div style="display: flex;flex-flow: column;font-size: 10px;">
            <span style='margin-top: 6px;'>城投债存量：${data.stock}(亿元)</span>
            <span style='margin-top: 6px;'>城投债数量：${data.number}(只)</span>
            <span style='margin-top: 6px;'>城投公司：  ${data.firm}(家)</span>
          </div>
          </div>`;
      },
    },
    label: {
      show: false,
      formatter: '{a}',
      color: 'rgb(249, 249, 249)',
    },
    itemStyle: {
      areaColor: '#1890ff',
      borderColor: '#53D9FF',
      borderWidth: 1.3,
      shadowBlur: 15,
      shadowColor: 'rgb(58,115,192)',
      shadowOffsetX: 7,
      shadowOffsetY: 6,
    },
    emphasis: {
      itemStyle: {
        areaColor: '#8dd7fc',
        borderWidth: 1.6,
        shadowBlur: 25,
      },
    },
    select: {
      itemStyle: {
        areaColor: '#8dd7fc',
        borderWidth: 1.6,
        shadowBlur: 25,
      },
    },
  },
  series: [
    {
      name: '存量持仓规模',
      type: 'map',
      map: 'china',
      geoIndex: 0,
      tooltip: {
        trigger: 'item',
      },
      data: [] as DailyProvince[],
    },
  ],
});

watch(
  () => props.model,
  () => {
    send();
  },
  {
    deep: true,
  },
);
</script>
<style lang="less" scoped></style>
