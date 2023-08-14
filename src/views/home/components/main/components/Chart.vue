<template>
  <div class="wh-full">
    <div class="absolute top-0 left-0 right-0 h-12 flex items-center px-4 z-10">
      <span class="flex-1 text-base">
        {{ data.systemName }}{{ isBPC }}{{ isDB }}
        -
        {{ AllIndicator[data.indicator] || AllIndicator[data.type] }}
      </span>
      <n-select
        v-model:value="ipList"
        class="w-54 ml-auto mr-2"
        multiple
        max-tag-count="responsive"
        :options="ipOptions"
      />
      <icon-mdi:refresh class="text-icon-color text-2xl cursor-pointer" />
    </div>
    <v-chart ref="chartRef" class="wh-full" :option="option" :autoresize="autoresize" />
  </div>
</template>
<script setup lang="ts">
import { getEsBpc, type EsParams, EsResponse } from '@/api';
import { AllIndicator, OtherIndicator, DbIndicatorMap, UniteIndicator } from '@/components/custom/sceneModel/helpers';
// import { ECOption } from '@/lib';
// import { bpcColumn } from '../helpers';

const props = defineProps<{
  data: {
    startTime: string;
    endTime: string;
    interval: string;
    ipList: string[];
    systemName: string;
    type: string;
    indicator: string;
    capSpv: Record<string, string>[];
  };
}>();
const chartRef = ref();
const autoresize = {
  throttle: 300,
  onResize: () => {
    chartRef.value?.resize();
  },
};

const ipOptions = computed(() => {
  return (props.data.ipList as string[]).map((ip) => ({ value: ip, label: ip }));
});
const ipList = ref<string[]>(props.data.ipList);

const isBPC = computed(() => Boolean(OtherIndicator[props.data.indicator]));
const isDB = computed(() => Boolean(DbIndicatorMap[props.data.indicator]));
const isUnite = computed(() => Boolean(UniteIndicator[props.data.indicator]));

const option = ref({
  color: ['#0F5EF7', '#FFB42B', '#00BC8B', '#793DFD', '#FF6B39', '#218FDB', '#7C7AB7', '#F111A5', '#B7D609', '#0DD5F3'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    bottom: -4,
  },
  grid: {
    left: '0%',
    right: 1,
    bottom: '10%',
    containLabel: true,
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false,
    },
    // boundaryGap: [0, 0.01],
  },
  xAxis: {
    type: 'category',
    data: [] as string[],
  },
  series: [] as any[],
});

function handleEsBpcData(data: EsResponse[], category: Record<string, string>[]) {
  const times = data.map(({ time }) => transformDateToYMDHms(time));
  const datas = category.reduce<{ name: string; data: string[] }[]>((result, { label, component }) => {
    const list = data.reduce<string[]>((result, item) => {
      if (item.ipGroup.length) {
        item.ipGroup.forEach((it) => {
          it.key === label && result.push(it.value);
        });
      } else {
        result.push('-');
      }
      return result;
    }, []);
    result.push({
      name: component || label,
      data: list,
    });
    return result;
  }, []);
  return {
    axis: times,
    datas,
  };
}
const initEs = async (data: EsParams) => {
  await getEs(data).send();
};
const initEsBpc = async (data: EsParams, type?: string) => {
  console.log('🚀 ~ data:', data);
  console.log('🚀 ~ data:', props.data);
  const res = await getEsBpc(data, type);
  const handleData = handleEsBpcData(res, props.data.capSpv || []);
  // console.log('🚀 ~ handleData:', type, handleData);
  option.value.xAxis.data = handleData.axis;
  option.value.series = handleData.datas.map((item) => {
    return { ...item, type: 'bar' };
  });
};
const initEsDb = async (data: EsParams) => {
  await getEsDb(data).send();
};
onMounted(() => {
  const { indicator, startTime, endTime, interval, capSpv, type } = props.data;
  const params = {
    ipList: ipList.value,
    type: indicator,
    startTime,
    endTime,
    interval,
  };
  if (unref(isBPC)) {
    initEsBpc({ ...params, capSpv: capSpv.map((item) => item.label).join(',') }, type);
  }
  if (unref(isDB)) {
    initEsDb(params);
  }
  if (!unref(isBPC) && !unref(isDB) && !unref(isUnite)) {
    initEs(params);
  }
});
// watch(
//   () => props.data.key,
//   (key: string) => {
//     console.log('🚀 ~ key:', key);
//   },
// );
</script>
<style scoped></style>
