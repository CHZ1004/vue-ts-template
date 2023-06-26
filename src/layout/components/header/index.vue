<template>
  <n-layout-header bordered class="h-12 flex">
    <MenuCollapse />
    <div class="flex items-center ml-auto text-2xl">
      <FullScreen />
      <n-divider vertical />
      <UserAvatar />
    </div>
  </n-layout-header>
</template>
<script setup lang="ts">
import { MenuCollapse, UserAvatar, FullScreen } from './components';
</script>
<style scoped></style>
