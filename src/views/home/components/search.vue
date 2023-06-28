<template>
  <div class="flex mb-2">
    <a-input :value="modelValue" placeholder="搜索分组" @input="$emit('update:modelValue', $event.target.value)" />
    <a-button :type="showAdd ? '' : 'primary'" class="flex-shrink-0 ml-2" @click="showAdd = !showAdd">
      {{ showAdd ? '取消' : '添加' }}
    </a-button>
  </div>
  <div v-show="showAdd" class="flex items-center mt-4 mb-2">
    <a-input v-model:value="addValue" placeholder="分组名称" />
    <a-button type="primary" class="ml-2">确定</a-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

defineEmits(['update:modelValue']);
defineProps<{
  modelValue: string;
}>();

const addValue = ref('');
const showAdd = ref(false);
</script>
<style lang="less" scoped></style>
