<template>
  <n-card class="h-12 rounded-none">
    <div class="h-full flex items-center justify-end text-2xl">
      <FullScreen />
      <n-divider vertical />
      <UserAvatar />
    </div>
  </n-card>
</template>
<script setup lang="ts">
import { UserAvatar, FullScreen } from './components';
</script>
<style scoped>
:deep(.n-card__content) {
  --n-padding-bottom: 0;
  --n-padding-left: 0;
}
</style>
