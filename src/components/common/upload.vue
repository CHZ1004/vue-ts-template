<template>
  <a-button type="primary" @click="upload">
    <slot>上传</slot>
  </a-button>
  <input ref="fileRef" class="w-0 h-0" type="file" name="file" accept=".xml,.xlsx" @change="change" />
</template>
<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'change', event: Event): void;
}>();
defineProps<{
  accept: string;
}>();
const fileRef = ref<HTMLInputElement | null>(null);
const upload = () => {
  fileRef.value && fileRef.value.click();
};
const change = (event: Event) => {
  emit('change', event);
  const target = event.target as HTMLInputElement;
  /** 清除上次选中的文件 */
  target.value = '';
  target.files && (target.files = null);
};
</script>
<style scoped></style>
