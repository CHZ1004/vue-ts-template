<template>
  <template v-if="!isEdit">
    <span class="mr-auto cursor-pointer">name</span>
    <hover-container class="w-6" @click.stop="isEdit = true">
      <form-outlined />
    </hover-container>
    <a-popconfirm title="确定删除该分组吗？" ok-text="确定" cancel-text="取消" @click.stop>
      <hover-container class="w-6">
        <delete-outlined />
      </hover-container>
    </a-popconfirm>
  </template>
  <div v-else class="flex items-center">
    <a-input ref="editRef" @blur="isEdit = false" />
    <a-button type="primary" class="ml-2">确定</a-button>
  </div>
</template>
<script setup lang="ts">
import { DeleteOutlined, FormOutlined } from '@ant-design/icons-vue';
import { nextTick, ref, watch } from 'vue';

const editRef = ref<HTMLInputElement | null>(null);
const isEdit = ref(false);

watch(
  () => isEdit.value,
  (value) => {
    value &&
      nextTick(() => {
        editRef.value && editRef.value.focus();
      });
  },
);
</script>
<style lang="less" scoped></style>
