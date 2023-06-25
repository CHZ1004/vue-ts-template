<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" class="h-full">
    <NaiveProvider>
      <RouterView class="h-full" />
    </NaiveProvider>
  </NConfigProvider>
</template>
<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui';
</script>

<style scoped></style>
