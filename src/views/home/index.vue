<template>
  <div>
    <HomeHeader :title="data?.templateName || ''" />
    <HomeMain ref="main" />
  </div>
</template>
<script setup lang="ts">
// import { useFullscreen } from '@vueuse/core';
import { ref } from 'vue';
import { useRequest } from 'alova';
import { getDefaultScene } from '@/api';
import { HomeHeader, HomeMain, HomeMainType } from './components';

const main = ref<HomeMainType | null>(null);
// const { toggle } = useFullscreen(main);
const { data } = useRequest(getDefaultScene);
console.log('🚀 ~ data:', data);
</script>
<style scoped></style>
