<template>
  <a-form name="form" :model="formData" layout="inline">
    <a-form-item label="日期">
      <a-range-picker v-model:value="formData.date" value-format="YYYY-MM-DD" @open-change="change" />
    </a-form-item>
    <a-form-item label="组合名称">
      <a-select
        v-model:value="formData.code"
        style="width: 160px"
        :field-names="fieldNames"
        :options="options"
        @change="change(false)"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="download">下载</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRequest } from 'alova';
import dayjs, { Dayjs } from 'dayjs';
import { stringify } from 'qs';
import { VolatilityParams, getCombinationList, downloadVolatility } from '@/api';

const emit = defineEmits<{
  (e: 'change', data: VolatilityParams): void;
}>();
type FormType = {
  date: [Dayjs, Dayjs] | undefined;
  code: string;
};
const formData = ref<FormType>({
  date: [dayjs('2022-09-30'), dayjs('	2022-12-31')],
  code: '',
});
const fieldNames = { label: 'combinationName', value: 'id' };
const { data } = useRequest(getCombinationList);
const options = computed(() => {
  return [
    {
      combinationName: '全部组合',
      id: '',
    },
    ...(data.value || []),
  ];
});

const handlerChange = ({ date, code }: FormType) => {
  const [startDate, endDate] = date || [];
  return {
    id: code,
    startDate: dayjs(startDate).format('YYYY-MM-DD'),
    endDate: dayjs(endDate).format('YYYY-MM-DD'),
  };
};
const change = (open: boolean) => {
  if (!open) {
    emit('change', handlerChange(formData.value));
  }
};
const download = async () => {
  const data = handlerChange(formData.value);
  const { baseURL, url } = downloadVolatility(data);
  const herf = `${baseURL}${url}?${stringify(data)}`;
  window.open(herf, '_self');
};
onMounted(() => {
  emit('change', handlerChange(formData.value));
});
</script>
<style lang="less" scoped></style>
