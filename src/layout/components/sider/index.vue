<template>
  <a-layout-sider v-model:collapsed="app.collapse" collapsible theme="light" :trigger="null" class="shadow-sm">
    <SiderLogo :show-title="app.collapse" />
    <SiderMenu />
  </a-layout-sider>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store';
import { SiderLogo, SiderMenu } from './components';

const app = useAppStore();
</script>
<style scoped></style>
