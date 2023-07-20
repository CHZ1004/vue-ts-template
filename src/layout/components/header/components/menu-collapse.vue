<template>
  <hover-container class="w-10" @click="app.toggleCollapse">
    <icon-line-md-menu-unfold-left v-if="app.collapse" class="text-2xl" />
    <icon-line-md-menu-fold-left v-else class="text-2xl" />
  </hover-container>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store';

const app = useAppStore();
</script>
<style scoped></style>
