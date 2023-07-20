<template>
  <a-form layout="inline" :model="model">
    <a-form-item label="日期">
      <a-date-picker v-model:value="date" class="min-w-40" placeholder="请选择日期" />
    </a-form-item>
    <a-form-item label="组合名称">
      <a-select
        v-model:value="id"
        class="min-w-40"
        placeholder="请选择组合名称"
        :field-names="{ label: 'combinationName', value: 'id' }"
        :options="combinationOptions"
      />
    </a-form-item>
    <a-form-item label="单位">
      <a-select v-model:value="unit" class="min-w-40" placeholder="请选择单位" :options="createOptions(unitLabels)" />
    </a-form-item>
    <a-form-item label="规模口径">
      <a-select
        v-model:value="calibre"
        class="min-w-40"
        placeholder="请选择规模口径"
        :options="createOptions(scaleLabels)"
      />
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { DailyParams, getCombinationList } from '@/api';

interface Props {
  model: DailyParams;
}
const props = defineProps<Props>();

const date = computed({
  set(value: Dayjs | null) {
    value && Reflect.set(props.model, 'date', dayjs(value).format('YYYY-MM-DD'));
  },
  get() {
    return dayjs(Reflect.get(props.model, 'date') || undefined);
  },
});
const id = computed(createComputed(props.model, 'id'));
const unit = computed(createComputed(props.model, 'unit'));
const calibre = computed(createComputed(props.model, 'calibre'));

function createComputed(data: DailyParams, name: string) {
  return {
    set(value: string) {
      Reflect.set(data, name, value);
    },
    get() {
      return Reflect.get(data, name);
    },
  };
}
function createOptions(list: string[]) {
  return list.map((label, index) => {
    return {
      label,
      value: `${index + 1}`,
    };
  });
}
const scaleLabels = ['全价市值', '净价市值', '成本价', '面值'];
const unitLabels = ['亿元', '万元', '元'];
const { data: combinationOptions } = useRequest(getCombinationList);
</script>
<style lang="less" scoped></style>
