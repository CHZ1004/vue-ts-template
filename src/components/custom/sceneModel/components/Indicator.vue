<template>
  <n-grid :cols="2" :x-gap="16">
    <n-gi :span="1" class="mb-6px">指标</n-gi>
    <n-gi :span="1" class="mb-6px">图表</n-gi>
  </n-grid>
  <div ref="draggableRef" class="h-40 pb-5 overflow-y-auto">
    <Draggable v-model="indicatorList" item-key="itemKey">
      <template #item="{ element, index }">
        <HoveHandle
          placement="bottom-center"
          class="mb-2"
          :add-hide="addHide"
          :delete-hide="deleteAndMoveHide"
          :move-hide="deleteAndMoveHide"
          :disabled="disabled"
          @add="add(index)"
          @delete="handleIndicator('minus', index)"
        >
          <IndicatorItem :index="index" :data="element" :disabled="disabled" :indicator-options="indicatorOptions" />
        </HoveHandle>
      </template>
    </Draggable>
  </div>
</template>
<script setup lang="ts">
import { useScroll } from '@vueuse/core';
import Draggable from 'vuedraggable';
import HoveHandle from './HoveHandle.vue';
import IndicatorItem from './IndicatorItem.vue';
import { DbIndicatorMap, IndicatorMap, handleMap, otherIndicator, handleIndicator } from '../helpers';

interface Props {
  list: Array<any>;
  itemKey: string;
  isBPC: boolean;
  isDB: boolean;
  disabled: boolean;
}
const props = defineProps<Props>();
const draggableRef = ref<HTMLElement | null>(null);
const { y } = useScroll(draggableRef, { behavior: 'smooth' });

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
const add = (index: number) => {
  handleIndicator('add', index + 1);
  nextTick(() => {
    y.value = Number.MAX_SAFE_INTEGER;
  });
};
const addHide = computed(() => props.list.length > 9);
const deleteAndMoveHide = computed(() => props.list.length < 2);

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
</script>
<style scoped></style>
