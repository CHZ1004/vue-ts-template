<template>
  <n-card :bordered="false">
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
        v-show="!hideDateTime"
        v-model:time="model.templateTime"
        v-model:type="model.timeType"
        v-model:granularity="model.granularity"
        path="templateTime"
      />
      <SystemForm :system-options="systemOptions" :show-time="hideDateTime" :list="model.templateData" />
    </n-form>
  </n-card>
</template>
<script setup lang="ts">
import { FormInst } from 'naive-ui';
import { Scene } from '@/api';
import { events } from '@/utils';
import { DisplayTypeEnum } from '@/enums';
import { SystemForm } from './components';
import { createIndicatorData, createTemplateData, DisplayType, rules } from './helpers';

const props = defineProps<{
  id?: string;
}>();
const initEdit = async (id: string) => {
  const res = await getSceneDetail(id).send();
  Object.assign(model.value, {
    ...res,
    templateData: JSON.parse(res.templateData as string),
  });
};
onMounted(() => {
  if (props.id) {
    initEdit(props.id);
  }
});
const { data: systemOptions } = useRequest(getSystemList, { initialData: [] });

const formRef = ref<FormInst | null>(null);
const model = ref<Scene>({
  displayType: DisplayTypeEnum.system,
  templateName: '',
  templateTime: '',
  timeType: '',
  granularity: '',
  templateData: [createTemplateData(), createTemplateData()],
});
const hideDateTime = ref(false);
watch(
  () => model.value.displayType,
  (type: DisplayTypeEnum) => {
    hideDateTime.value = type === DisplayTypeEnum.time;
    model.value = {
      displayType: type,
      templateName: '',
      templateTime: '',
      timeType: '',
      granularity: '',
      templateData: [createTemplateData(), createTemplateData()],
    };
  },
);
events.on('HandelrIndicator', ({ type, index, data }) => {
  if (!Array.isArray(model.value.templateData)) return;
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

const confirm = () => {
  return new Promise<any | undefined>((resove, reject) => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        resove({
          ...model.value,
          templateData: JSON.stringify(model.value.templateData),
        });
      } else {
        reject(errors);
      }
    });
  });
};
defineExpose({
  confirm,
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
