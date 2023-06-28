<template>
  <template v-if="!isEdit">
    <span class="mr-auto cursor-pointer">{{ data.combinationName }}</span>
    <hover-container class="w-6" @click.stop="isEdit = true">
      <form-outlined />
    </hover-container>
    <a-popconfirm
      title="确定删除该分组吗？"
      ok-text="确定"
      cancel-text="取消"
      @confirm="$emit('onDelete', data.id)"
      @click.stop
    >
      <hover-container class="w-6">
        <delete-outlined />
      </hover-container>
    </a-popconfirm>
  </template>
  <a-input v-else ref="editRef" v-model:value="editValue" @keyup.enter="enter" @blur="blur" />
</template>
<script setup lang="ts">
import { DeleteOutlined, FormOutlined } from '@ant-design/icons-vue';
import { nextTick, ref, watch } from 'vue';
import { Combination } from '@/api';

const emit = defineEmits<{
  (e: 'onUpdate', { data, reset }: { data: Combination; reset: () => void }): void;
  (e: 'onDelete', id: string): void;
}>();
const props = defineProps<{
  data: Combination;
}>();
const editRef = ref<HTMLInputElement | null>(null);
const editValue = ref('');
const isEdit = ref(false);
const isKeyup = ref(false);
watch(
  () => isEdit.value,
  (value) => {
    value &&
      nextTick(() => {
        editRef.value && editRef.value.focus();
        editValue.value = props.data.combinationName;
      });
  },
);
const reset = () => {
  isEdit.value = false;
  isKeyup.value = false;
};
const update = () => {
  if (props.data.combinationName === editValue.value) {
    reset();
    return;
  }
  emit('onUpdate', { data: { ...props.data, combinationName: editValue.value }, reset });
};
const blur = () => {
  if (isKeyup.value) return;
  update();
};
const enter = () => {
  isKeyup.value = true;
  update();
};
</script>
<style lang="less" scoped></style>
