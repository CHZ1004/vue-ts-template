<template>
  <div class="flex items-center justify-center h-12">
    <SystemLogin class="w-8 h-8 mr-2 flex-shrink-0" />
    <h2 v-show="showTitle" class="truncate text-base">运营数据多维分析平台</h2>
  </div>
</template>
<script setup lang="ts">
interface Props {
  /** 显示名字 */
  showTitle: boolean;
}

defineProps<Props>();
</script>
<style scoped></style>
