<template>
  <HoverContainer class="w-40px h-full text-icon-color" tooltip-content="全屏" @click="toggle">
    <icon-gridicons-fullscreen-exit v-if="isFullscreen" class="text-2xl" />
    <icon-gridicons-fullscreen v-else class="text-2xl" />
  </HoverContainer>
</template>
<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';

const { isFullscreen, toggle } = useFullscreen();
</script>
<style scoped></style>
