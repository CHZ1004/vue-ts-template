<template>
  <div>
    <n-card>
      <n-form ref="formRef" :model="model" :rules="rules" label-placement="top" require-mark-placement="left">
        <n-form-item label="展示类型" label-placement="left" path="displayType">
          <n-radio-group v-model:value="model.displayType">
            <n-radio-button v-for="item in DisplayType" :key="item.value" :label="item.label" :value="item.value" />
          </n-radio-group>
        </n-form-item>
        <n-form-item label="名称" path="templateName">
          <n-input v-model:value="model.templateName" placeholder="输入场景名称" />
        </n-form-item>
        <DateTimePicker
          v-model:time="model.templateTime"
          v-model:type="model.timeType"
          v-model:granularity="model.granularity"
          path="templateTime"
        />
        <n-form-item label="系统选择" required class="grid-cols-4 grid-cols-3 grid-cols-2 grid-cols-1">
          <Draggable
            :list="model.templateData"
            item-key="key"
            handle=".handle"
            class="w-full grid gap-4"
            :class="`grid-cols-${model.templateData.length}`"
          >
            <template #item="{ element, index }">
              <HoveHandle
                :add-hide="addHide"
                :delete-hide="deleteAndMoveHide"
                :move-hide="deleteAndMoveHide"
                @add="addSystem(index + 1)"
                @delete="deleteSystem(index)"
              >
                <SystemItem :system-options="systemOptions" :system-data="element" :index="index" />
              </HoveHandle>
            </template>
          </Draggable>
        </n-form-item>
      </n-form>
    </n-card>
    <n-button @click="confirm">确定</n-button>
  </div>
</template>
<script setup lang="ts">
import { FormInst } from 'naive-ui';
import Draggable from 'vuedraggable';
import { getSystemList } from '@/api';
import SystemItem from './SystemItem.vue';
import HoveHandle from './HoveHandle.vue';
import { events } from '@/utils';

const { data: systemOptions } = useRequest(getSystemList, { initialData: [] });
const DisplayType = [
  {
    value: 'system',
    label: '对比系统',
  },
  {
    value: 'time',
    label: '对比时间',
  },
];
const confirm = () => {
  console.log('model.value', model.value);
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('验证通过');
    } else {
      console.log(errors);
    }
  });
};

const createIndicatorData = () => ({
  key: nanoid(),
  indicator: null,
  type: null,
});
const createTemplateData = (num = 1) => ({
  key: nanoid(),
  system: null,
  systemName: '',
  ips: [],
  ipIdList: null,
  dataList: [...new Array(num)].map(() => createIndicatorData()),
});
const formRef = ref<FormInst | null>(null);
const model = ref({
  displayType: 'system',
  templateName: '',
  templateTime: '',
  timeType: '',
  granularity: '',
  templateData: [createTemplateData(), createTemplateData()],
});
const addHide = computed(() => model.value.templateData.length > 3);
const deleteAndMoveHide = computed(() => model.value.templateData.length < 2);
const addSystem = (index: number) => {
  const len = model.value.templateData[0].dataList.length;
  model.value.templateData.splice(index, 0, createTemplateData(len));
};
const deleteSystem = (index: number) => {
  model.value.templateData.splice(index, 1);
};
events.on('HandelrIndicator', ({ type, index, data }) => {
  model.value.templateData.map((item) => {
    switch (type) {
      case 'add':
        item.dataList.splice(index, 0, createIndicatorData());
        break;
      case 'minus':
        item.dataList.splice(index, 1);
        break;
      case 'update':
        Object.assign(item.dataList[index], data);
        break;
      default:
        break;
    }
    return item;
  });
});
const rules = ref({
  templateName: {
    required: true,
    message: '请输入场景名称',
    trigger: ['blur'],
  },
  templateTime: {
    required: true,
    message: '请选择时间',
    trigger: ['change'],
  },
});
</script>
<style scoped>
:deep(.n-card__content) {
  --n-padding-bottom: 16px;
  --n-padding-left: 16px;
}
:deep(.n-form-item-label__text) {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
:deep(.n-base-selection-overlay__wrapper) {
  display: flex;
  align-items: center;
}
:deep(.n-base-selection-overlay__wrapper span:nth-child(2)::after) {
  content: '】';
}
:deep(.n-base-selection-overlay__wrapper span:nth-child(2)::before) {
  content: '【';
}
:deep(.n-n-tag__content) {
  display: flex;
  align-items: center;
}
:deep(.n-tag__content span:nth-child(2)::after) {
  content: '】';
}
:deep(.n-tag__content span:nth-child(2)::before) {
  content: '【';
}
:deep(.n-base-select-option__content) {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
