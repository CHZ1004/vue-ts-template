<template>
  <div class="p-3 border-1 border-[var(--n-border-color)]">
    <n-form-item label="系统" required size="small" :path="`templateData[${index}].system`" :rule="rules.system">
      <n-select
        v-model:value="system"
        filterable
        clearable
        :to="false"
        label-field="systemName"
        value-field="systemId"
        :render-label="renderSystemLabel"
        :options="options"
        @update:value="systemUpdate"
        @clear="systemClear"
      />
    </n-form-item>
    <n-form-item required size="small" :path="`templateData[${index}].ipIdList`" :rule="rules.ipIdList">
      <template #label>
        <span>IP地址</span>
        <n-button text type="primary" @click="clearOrCheckAllIps(isClearIps)">
          {{ isClearIps ? '清空' : '全选' }}
        </n-button>
      </template>
      <n-select
        v-model:value="ipIdList"
        :to="false"
        multiple
        max-tag-count="responsive"
        label-field="addressName"
        value-field="addressId"
        :render-label="renderIpLabel"
        :options="ipOptions"
      />
    </n-form-item>
    <Indicator :list="indicatorList" :is-b-p-c="isBPC" :is-d-b="isDB" :disabled="Boolean(index)" item-key="key" />
  </div>
</template>
<script setup lang="ts">
import { System, SystemDetailIps, getSystemDetail } from '@/api';
import Indicator from './Indicator.vue';
import { renderSystemLabel, renderIpLabel, handleIpIdList, handleIpAddressList } from './helpers';

interface Props {
  systemData: any;
  index: number;
  systemOptions: System[];
}
const props = defineProps<Props>();
const options = computed(() => {
  return props.systemOptions.map((item) => {
    item.isBPC = item.capSpvFlag === '1';
    return item;
  });
});
/** 当前系统ID */
const system = computed({
  set(value: string) {
    Reflect.set(props.systemData, 'system', value);
  },
  get() {
    return Reflect.get(props.systemData, 'system') || null;
  },
});
const systemUpdate = (_: string, option: System) => {
  Reflect.set(props.systemData, 'isBPC', option.isBPC);
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
  async (value: string) => {
    if (!value) return;
    const { addressList } = await getSystemDetail(value).send();
    ipOptions.value = addressList || [];
    ipIdList.value = handleIpIdList(addressList);
  },
  {
    immediate: true,
  },
);
/** 当前选中的IP列表 */
const ipIdList = computed({
  set(value: string[]) {
    Reflect.set(props.systemData, 'ips', handleIpAddressList(unref(ipOptions), value));
    return Reflect.set(props.systemData, 'ipIdList', value);
  },
  get() {
    return Reflect.get(props.systemData, 'ipIdList') || null;
  },
});
const isClearIps = computed(() => {
  return unref(ipIdList)?.length >= unref(ipOptions)?.length;
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

const rules = {
  system: {
    required: true,
    message: `请选择系统`,
    trigger: ['change', 'blur'],
  },
  ipIdList: {
    type: 'array',
    required: true,
    message: `请选择系统IP`,
    trigger: ['change', 'blur'],
  },
};
</script>
<style lang="less" scoped></style>
