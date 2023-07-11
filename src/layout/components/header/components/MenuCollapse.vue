<template>
  <HoverContainer class="w-40px h-full" @click="app.toggleSiderCollapse">
    <icon-line-md-menu-unfold-left v-if="app.siderCollapse" class="text-2xl" />
    <icon-line-md-menu-fold-left v-else class="text-2xl" />
  </HoverContainer>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store';

const app = useAppStore();
</script>
<style lang="less" scoped></style>
