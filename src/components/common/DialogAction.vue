<template>
  <div class="p-4">
    <n-button class="mr-5 px-7" @click="destroy && destroy()"> 取消 </n-button>
    <n-button type="primary" class="px-7"> 确定 </n-button>
  </div>
</template>
<script setup lang="ts">
interface Props {
  destroy: () => void;
}
defineProps<Props>();
</script>
<style scoped></style>
