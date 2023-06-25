<template>
  <div class="fixed left-0 top-0 flex justify-center items-center w-full h-full flex-col">
    <!-- <img :src="logo" alt="loading-logo" class="w-32 h-32" /> -->
    <div class="w-56px h-56px my-36px">
      <div class="relative h-full animate-spin">
        <div
          v-for="(item, index) in lodingClasses"
          :key="index"
          class="absolute w-16px h-16px bg-red rounded-8px animate-pulse"
          :class="item"
        ></div>
      </div>
    </div>
    <h2 class="text-28px font-500 text-#646464">{{ title }}</h2>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

// TODO loading颜色需要为主颜色
const title = ref('运营数据多维分析平台');
const lodingClasses = [
  'left-0 top-0',
  'left-0 bottom-0 animate-delay-500',
  'right-0 top-0 animate-delay-1000',
  'right-0 bottom-0 animate-delay-1500',
];
</script>
<style scoped></style>
