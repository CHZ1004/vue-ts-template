<template>
  <template v-if="!is">
    <slot :show="setTrue"></slot>
  </template>
  <n-input v-else ref="inputRef" v-model:value="value" @blur="reset" @keyup.enter="reset" />
</template>
<script setup lang="ts">
import { InputInst } from 'naive-ui';
import { nextTick, ref, watch } from 'vue';
import { useBoolean } from '@/hooks';

const emit = defineEmits(['change']);
const props = withDefaults(
  defineProps<{
    initValue?: string;
  }>(),
  {
    initValue: '',
  },
);
const value = ref<string>(props.initValue);

const update = () => {
  if (value.value === props.initValue) return;
  if (!value.value) return;
  emit('change', value.value);
  value.value = '';
};

const { bool: is, setTrue, setFalse } = useBoolean();
const inputRef = ref<InputInst | null>(null);
const reset = () => {
  setFalse();
};
const autoFocus = () => {
  nextTick(() => {
    inputRef.value?.focus();
  });
};
watch(
  () => props.initValue,
  (v) => {
    value.value = v;
  },
);
watch(
  () => is.value,
  (is) => {
    is && autoFocus();
    !is && update();
  },
);
</script>
<style scoped></style>
