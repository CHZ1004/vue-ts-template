<template>
  <n-grid :cols="2" :x-gap="12">
    <n-form-item-gi :span="1" size="small" :show-label="false" :show-feedback="false">
      <n-select
        v-model:value="indicator"
        :disabled="disabled"
        :options="indicatorOptions"
        @update:value="indicatorChange(data.type, index, $event)"
      />
    </n-form-item-gi>
    <n-form-item-gi :span="1" size="small" :show-label="false" :show-feedback="false">
      <n-select
        :value="data.type"
        :disabled="disabled"
        :options="chartOptions"
        @update:value="chartChange(data.indicator, index, $event)"
      />
    </n-form-item-gi>
  </n-grid>
</template>
<script setup lang="ts">
import { BpcChartMap, ChartMap, handleIndicator, handleMap } from '../helpers';

interface Props {
  /** 当前索引 */
  index: number;
  /** 是否禁用 */
  disabled: boolean;
  /** 指标下拉选项 */
  indicatorOptions: { label: string; value: string }[];
  data: Record<string, string>;
}
const props = defineProps<Props>();

const isBPC = computed(() => props.data.indicator?.includes('BPC'));
const chartOptions = computed(() => handleMap(isBPC.value ? BpcChartMap : ChartMap));
const indicatorValues = computed(() => props.indicatorOptions.map(({ value }) => value));

const indicator = computed({
  set(value: string) {
    Reflect.set(props.data, 'indicator', value);
    const data = props.indicatorOptions.filter((item) => item.value === value);
    Reflect.set(props.data, 'label', data[0].label);
  },
  get() {
    if (props.data.indicator && !indicatorValues.value.includes(props.data.indicator)) {
      Reflect.set(props.data, 'indicator', null);
      Reflect.set(props.data, 'type', null);
    }
    return Reflect.get(props.data, 'indicator');
  },
});
const indicatorChange = (type: string | null, index: number, value: string) => {
  const isBPC = value.includes('BPC');
  if (type && ((isBPC && ChartMap[type]) || (!isBPC && BpcChartMap[type]))) {
    type = null;
  }
  handleIndicator('update', index, {
    indicator: value,
    type,
  });
};

const chartChange = (indicator: string, index: number, value: string) => {
  handleIndicator('update', index, {
    indicator,
    type: value,
  });
};
</script>
<style scoped></style>
