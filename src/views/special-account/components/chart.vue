<template>
  <VChart class="wh-full" :loading="loading" :option="option" autoresize />
</template>
<script setup lang="ts">
import { useRequest } from 'alova';
import { ref, watch } from 'vue';
import VChart from 'vue-echarts';
import { VolatilityParams, getFindVolatility } from '@/api';

const props = defineProps<{
  params?: VolatilityParams;
}>();
const { loading, onSuccess, send } = useRequest((data) => getFindVolatility(data), {
  initialData: [],
  immediate: false,
});
onSuccess(({ data }) => {
  option.value.xAxis.data = data.map((x) => x.date);
  option.value.series.data = data.map((x) => x.growthRate);
});
const option = ref({
  title: {
    text: '累计净值增长率',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      animation: false,
      label: {
        backgroundColor: '#ccc',
        borderColor: '#aaa',
        borderWidth: 1,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        color: '#222',
      },
    },
    // formatter: function (params) {
    //   return params[2].name + '<br />' + ((params[2].value - base) * 100).toFixed(1) + '%';
    // },
  },
  legend: {
    bottom: 0,
  },
  xAxis: {
    type: 'category',
    data: [] as string[],
    axisLabel: {
      rotate: 45,
      formatter(value: string) {
        return value;
      },
    },
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
  },
  series: {
    name: '增长率',
    data: [] as string[],
    type: 'line',
    showSymbol: false,
  },
});

watch(
  () => props.params?.code,
  (code) => {
    code && send(props.params);
  },
);
</script>
<style lang="less" scoped></style>
