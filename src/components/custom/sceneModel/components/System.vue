<template>
  <n-form-item label="系统选择" required class="grid-cols-4 grid-cols-3 grid-cols-2 grid-cols-1" :show-feedback="false">
    <Draggable
      v-model:list="templateData"
      item-key="key"
      handle=".handle"
      class="w-full grid gap-4"
      :class="`grid-cols-${templateData.length}`"
    >
      <template #item="{ element, index }">
        <HoveHandle
          :add-hide="addHide"
          :delete-hide="deleteAndMoveHide"
          :move-hide="deleteAndMoveHide"
          @add="addSystem(index + 1)"
          @delete="deleteSystem(index)"
        >
          <SystemItem :show-time="showTime" :system-options="systemOptions" :system-data="element" :index="index" />
        </HoveHandle>
      </template>
    </Draggable>
  </n-form-item>
</template>
<script setup lang="ts">
import Draggable from 'vuedraggable';
import { System, SceneTemplate } from '@/api';
import SystemItem from './SystemItem.vue';
import HoveHandle from './HoveHandle.vue';
import { createTemplateData } from '../helpers';

interface Props {
  list: SceneTemplate[];
  systemOptions: System[];
  showTime?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:list']);
const templateData = computed({
  set(list: SceneTemplate[]) {
    emit('update:list', list);
  },
  get() {
    return Reflect.get(props, 'list');
  },
});

const addHide = computed(() => templateData.value.length > 3);
const deleteAndMoveHide = computed(() => templateData.value.length < 2);
const addSystem = (index: number) => {
  const len = templateData.value[0].dataList.length;
  templateData.value.splice(index, 0, createTemplateData(len));
};
const deleteSystem = (index: number) => {
  templateData.value.splice(index, 1);
};
</script>
<style scoped></style>
