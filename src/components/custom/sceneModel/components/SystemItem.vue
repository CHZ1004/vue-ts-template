<template>
  <div class="p-3 border-1 border-[var(--n-border-color)]">
    <DateTimePicker
      v-if="showTime"
      v-model:time="time"
      v-model:type="timeType"
      v-model:granularity="granularity"
      :path="`templateData[${index}].time`"
      :rule="rules.templateTime"
    />
    <n-form-item label="系统" size="small" :path="`templateData[${index}].system`" :rule="rules.system">
      <n-select
        v-model:value="system"
        filterable
        clearable
        :to="false"
        label-field="systemName"
        value-field="systemId"
        :render-label="renderSystemLabel"
        :options="options"
        :disabled="Boolean(index) && showTime"
        @update:value="systemUpdate"
        @clear="systemClear"
      />
    </n-form-item>
    <n-form-item size="small" :path="`templateData[${index}].ipIdList`" :rule="rules.ipIdList">
      <template #label>
        <span>IP地址</span>
        <n-gradient-text type="primary" class="cursor-pointer" @click.stop="clearOrCheckAllIps(isClearIps)">
          {{ isClearIps ? '清空' : '全选' }}
        </n-gradient-text>
      </template>
      <n-select
        ref="ipIdListRef"
        v-model:value="ipIdList"
        :to="false"
        multiple
        max-tag-count="responsive"
        label-field="addressName"
        value-field="addressId"
        :disabled="Boolean(index) && showTime"
        :render-label="renderIpLabel"
        :options="ipOptions"
      />
    </n-form-item>
    <Indicator :list="indicatorList" :is-b-p-c="isBPC" :is-d-b="isDB" :disabled="Boolean(index)" item-key="key" />
  </div>
</template>
<script setup lang="ts">
import { System, SceneTemplate, SystemDetailIps, getSystemDetail } from '@/api';
import Indicator from './Indicator.vue';
import { renderSystemLabel, renderIpLabel, handleIpIdList, handleIpAddressList, rules } from '../helpers';

interface Props {
  systemData: SceneTemplate & { isBPC: boolean };
  index: number;
  systemOptions: System[];
  showTime?: boolean;
}
const props = defineProps<Props>();
const options = computed(() => {
  return props.systemOptions.map((item) => {
    item.isBPC = item.capSpvFlag === '1';
    return item;
  });
});
const time = computed({
  set(value?: string) {
    Reflect.set(props.systemData, 'time', value);
  },
  get() {
    return Reflect.get(props.systemData, 'time');
  },
});
const timeType = computed({
  set(value?: string) {
    Reflect.set(props.systemData, 'timeType', value);
  },
  get() {
    return Reflect.get(props.systemData, 'timeType');
  },
});
const granularity = computed({
  set(value?: string) {
    Reflect.set(props.systemData, 'granularity', value);
  },
  get() {
    return Reflect.get(props.systemData, 'granularity');
  },
});
/** 当前系统ID */
const system = computed({
  set(value: string | null) {
    Reflect.set(props.systemData, 'system', value);
  },
  get() {
    return Reflect.get(props.systemData, 'system') || null;
  },
});
const systemUpdate = (_: string, option: System) => {
  Reflect.set(props.systemData, 'isBPC', option.isBPC);
  Reflect.set(props.systemData, 'capSpv', option.capSpv);
  Reflect.set(props.systemData, 'systemName', option.systemName);
};
const systemClear = () => {
  ipIdList.value = [];
};
/** 当前系统ID获取系统下的IP列表 */
const ipOptions = ref<SystemDetailIps[]>([]);
/** 侦听系统ID */
watch(
  () => props.systemData.system,
  async (value: string | null) => {
    if (!value) return;
    const { addressList } = await getSystemDetail(value).send();
    ipOptions.value = addressList || [];
    ipIdList.value = handleIpIdList(addressList);
    /** 触发blur事件 用来触发校验 */
    ipIdListRef.value?.focus();
    ipIdListRef.value?.blur();
  },
  {
    immediate: true,
  },
);
/** 当前选中的IP列表 */
const ipIdListRef = ref();
const ipIdList = computed({
  set(value: string[] | null) {
    Reflect.set(props.systemData, 'ips', handleIpAddressList(unref(ipOptions), value));
    return Reflect.set(props.systemData, 'ipIdList', value);
  },
  get() {
    return Reflect.get(props.systemData, 'ipIdList') || null;
  },
});
const isClearIps = computed(() => {
  if (!unref(ipIdList)) return false;
  return unref(ipOptions)?.length <= ipIdList.value!.length;
});
const clearOrCheckAllIps = (isClear: boolean) => {
  ipIdList.value = handleIpIdList(isClear ? [] : unref(ipOptions));
};
/** 指标列表 */
const indicatorList = computed({
  set(value: Array<any>) {
    return Reflect.set(props.systemData, 'dataList', value);
  },
  get() {
    return Reflect.get(props.systemData, 'dataList');
  },
});
const isBPC = computed(() => props.systemData.isBPC || false);
const isDB = computed(() =>
  unref(ipOptions).some(({ addressName }) => {
    return addressName.includes('数据库') || addressName.toLocaleLowerCase().includes('DB');
  }),
);
</script>
<style lang="less" scoped></style>
