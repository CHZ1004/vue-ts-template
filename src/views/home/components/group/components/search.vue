<template>
  <div class="flex mb-2">
    <a-input :value="modelValue" placeholder="搜索分组" @input="$emit('update:modelValue', $event.target.value)" />
    <a-button :type="showAdd ? '' : 'primary'" class="flex-shrink-0 ml-2" @click="showAdd = !showAdd">
      {{ showAdd ? '取消' : '添加' }}
    </a-button>
  </div>
  <div v-show="showAdd" class="flex items-center mt-4 mb-2">
    <a-input v-model:value="addValue" placeholder="分组名称" />
    <a-button type="primary" class="ml-2" @click="$emit('onAdd', addValue, reset)">确定</a-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

defineEmits<{
  (e: 'update:modelValue'): void;
  (e: 'onAdd', value: string, reset: () => void): void;
}>();
defineProps<{
  modelValue: string;
}>();

const addValue = ref('');
const showAdd = ref(false);
const reset = () => {
  addValue.value = '';
  showAdd.value = false;
};
</script>
<style lang="less" scoped></style>
