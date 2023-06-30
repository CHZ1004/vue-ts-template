<template>
  <div class="h-12 flex items-center justify-end text-2xl bg-white shadow-xl">
    <FullScreen />
    <n-divider vertical />
    <UserAvatar />
  </div>
</template>
<script setup lang="ts">
import { UserAvatar, FullScreen } from './components';
</script>
<style scoped></style>
