<template>
  <div>
    <n-card>
      <n-form :model="model" :rules="rules" label-placement="top" require-mark-placement="left">
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
        <n-form-item label="系统选择" required>
          <n-grid :cols="12" :x-gap="16">
            <n-gi
              v-for="(_, index) in model.templateData"
              :key="index"
              :span="12 / model.templateData.length"
              class="p-3 border-1 border-[var(--n-border-color)]"
            >
              <n-form-item label="系统" required size="small">
                <n-input></n-input>
              </n-form-item>
              <n-form-item required size="small">
                <template #label>
                  <span>IP地址</span>
                  <n-button text type="primary">清空</n-button>
                </template>
                <n-input></n-input>
              </n-form-item>
              <n-grid :cols="2" :x-gap="16">
                <n-gi :span="1" class="mb-6px">指标</n-gi>
                <n-gi :span="1" class="mb-6px">图表</n-gi>
              </n-grid>
              <n-grid :cols="2" :x-gap="16">
                <n-form-item-gi :span="1" class="mb-2" size="small" :show-label="false" :show-feedback="false">
                  <n-select></n-select>
                </n-form-item-gi>
                <n-form-item-gi :span="1" class="mb-2" size="small" :show-label="false" :show-feedback="false">
                  <n-select></n-select>
                </n-form-item-gi>
              </n-grid>
            </n-gi>
          </n-grid>
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

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
const model = ref({
  displayType: 'system',
  templateName: '',
  templateTime: '',
  timeType: '',
  granularity: '',
  templateData: [{}, {}],
});
const rules = ref({
  templateName: {
    required: true,
    message: '请输入场景名称',
  },
  templateTime: {
    required: true,
    message: '请选择时间',
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
</style>
