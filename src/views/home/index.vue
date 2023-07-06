<template>
  <div class="flex flex-col gap-4">
    <HomeHeader :title="data?.templateName || ''" @refresh="send" @fullscreen="enter" />
    <!-- class="p-4 bg-warm-gray-100" -->
    <main ref="main">
      <HomeMain />
    </main>
  </div>
</template>
<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
import { ref } from 'vue';
import { useRequest } from 'alova';
import { getDefaultScene } from '@/api';
import { HomeHeader, HomeMain } from './components';

const main = ref<HTMLElement | null>(null);
const { enter } = useFullscreen(main);
const { data, send } = useRequest(getDefaultScene);
</script>
<style scoped></style>
