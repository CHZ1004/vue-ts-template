<template>
  <n-grid :cols="2" :x-gap="16">
    <n-gi :span="1" class="mb-6px">指标</n-gi>
    <n-gi :span="1" class="mb-6px">图表</n-gi>
  </n-grid>
  <Draggable v-model="indicatorList" item-key="itemKey">
    <template #item="{ element, index }">
      <HoveHandle
        placement="bottom-center"
        class="mb-2"
        :add-hide="addHide"
        :delete-hide="deleteAndMoveHide"
        :move-hide="deleteAndMoveHide"
        @add="handleIndicator('add', index + 1)"
        @delete="handleIndicator('minus', index)"
      >
        <n-grid :cols="2" :x-gap="16">
          <n-form-item-gi :span="1" size="small" :show-label="false" :show-feedback="false">
            <n-select
              :value="indicator(element.indicator)"
              :disabled="disabled"
              :options="indicatorOptions"
              @update:value="indicatorUpdate(element.type, index, $event)"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="1" size="small" :show-label="false" :show-feedback="false">
            <n-select
              :value="element.type"
              :disabled="disabled"
              :options="chartOptions(element.indicator)"
              @update:value="chartUpdate(element.indicator, index, $event)"
            />
          </n-form-item-gi>
        </n-grid>
      </HoveHandle>
    </template>
  </Draggable>
</template>
<script setup lang="ts">
import Draggable from 'vuedraggable';
import HoveHandle from './HoveHandle.vue';
import { events } from '@/utils';
import { handleMap } from './helpers';

interface Props {
  list: Array<any>;
  itemKey: string;
  isBPC: boolean;
  isDB: boolean;
  disabled: boolean;
}
const props = defineProps<Props>();
const { isBPC, isDB } = toRefs(props);
const emit = defineEmits(['update:list']);
const indicatorList = computed({
  set(list: Array<any>) {
    return emit('update:list', list);
  },
  get() {
    return props.list;
  },
});
const addHide = computed(() => props.list.length > 9);
const deleteAndMoveHide = computed(() => props.list.length < 2);

const indicatorUpdate = (type: string | null, index: number, value: string) => {
  const isBPC = value.includes('BPC');
  if (type && ((isBPC && ChartMap[type]) || (!isBPC && BpcChartMap[type]))) {
    type = null;
  }
  handleIndicator('update', index, {
    indicator: value,
    type,
  });
};
const chartUpdate = (indicator: string, index: number, value: string) => {
  handleIndicator('update', index, {
    indicator,
    type: value,
  });
};

const handleIndicator = (type: string, index: number, data?: any) => {
  data && Reflect.deleteProperty(data, 'key');
  events.emit('HandelrIndicator', {
    type,
    index,
    data,
  });
};

const ChartMap: Record<string, string> = {
  bar: '柱形图',
  LeftBar: '条状图',
  line: '折线图',
  area: '面积图',
};

const BpcChartMap: Record<string, string> = {
  bpcVolume: 'BPC-交易量',
  bpcSuccess: 'BPC-成功率',
  bpcResponse: 'BPC-响应率',
  bpcResponseTime: 'BPC-平均响应耗时',
};
const IndicatorMap: Record<string, string> = {
  CPU: 'CPU使用率',
  MEMORY: '内存使用率',
  DISK: '磁盘使用率',
  IOPS: '磁盘读写',
  TRAFFIC: '网卡出入流量',
};
const DbIndicatorMap: Record<string, string> = {
  CURRENT_SESSION: '数据库当前会话数',
  ACTIVE_SESSION: '数据库活动会话数',
};
const otherIndicator = {
  BPC: 'BPC',
};

const chartOptions = computed(() => (indicator: string) => {
  const is = indicator?.includes('BPC');
  return handleMap(is ? BpcChartMap : ChartMap);
});
const indicatorOptions = computed(() => {
  const _IndicatorMap = { ...IndicatorMap };
  if (isBPC.value) {
    Object.assign(_IndicatorMap, otherIndicator);
  }
  if (isDB.value) {
    Object.assign(_IndicatorMap, DbIndicatorMap);
  }
  return handleMap(_IndicatorMap);
});

const indicator = computed(() => {
  const options = indicatorOptions.value.map(({ value }) => value);
  return (indicator: string) => {
    if (!indicator || !options.includes(indicator)) {
      return null;
    }
    return indicator;
  };
});
</script>
<style scoped></style>
