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
    primaryColorHover: 'rgb(56,129,255)',
    primaryColorSuppl: 'rgb(15,94,247)',
    primaryColorPressed: 'rgb(2,64,209)',
  },
  Dialog: {
    padding: 0,
    contentMargin: 0,
  },
};

subscribeStore();
</script>

<style>
/* :root {
  --primary-color: 15, 94, 247;
  --primary-color1: 230, 242, 255;
  --primary-color2: 179, 214, 255;
  --primary-color3: 138, 189, 255;
  --primary-color4: 97, 160, 255;
  --primary-color5: 56, 129, 255;
  --primary-color6: 15, 94, 247;
  --primary-color7: 2, 64, 209;
  --primary-color8: 0, 46, 171;
  --primary-color9: 0, 31, 133;
  --primary-color10: 0, 19, 94;
  --primary-color-suppl: 15, 94, 247;
  --primary-color-hover: 56, 129, 255;
  --primary-color-pressed: 2, 64, 209;
  --primary-color-active: 15, 94, 247;
  --info-color: 2, 64, 209;
  --info-color-suppl: 2, 64, 209;
  --info-color-hover: 38, 99, 222;
  --info-color-pressed: 0, 46, 171;
  --info-color-active: 2, 64, 209;
  --success-color: 82, 196, 26;
  --success-color-suppl: 82, 196, 26;
  --success-color-hover: 115, 209, 61;
  --success-color-pressed: 56, 158, 13;
  --success-color-active: 82, 196, 26;
  --warning-color: 250, 173, 20;
  --warning-color-suppl: 250, 173, 20;
  --warning-color-hover: 255, 197, 61;
  --warning-color-pressed: 212, 136, 6;
  --warning-color-active: 250, 173, 20;
  --error-color: 245, 34, 45;
  --error-color-suppl: 245, 34, 45;
  -error-color-hover: 255, 77, 79;
  --error-color-pressed: 207, 19, 34;
  --error-color-active: 245, 34, 45;
} */
</style>
