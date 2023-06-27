<template>
  <NConfigProvider :locale="zhCN" :theme-overrides="themeOverrides" :date-locale="dateZhCN" class="h-full">
    <NaiveProvider>
      <RouterView class="h-full" />
    </NaiveProvider>
  </NConfigProvider>
</template>
<script setup lang="ts">
import { zhCN, dateZhCN, GlobalThemeOverrides } from 'naive-ui';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#0F5EF7',
  },
};
</script>

<style scoped></style>
