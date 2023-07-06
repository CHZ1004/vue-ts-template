<template>
  <n-layout has-sider>
    <LayoutSider />
    <n-layout>
      <LayoutHeader class="shadow-xl" />
      <n-layout-content>
        <router-view class="p-4 flex-1 bg-warm-gray-100" />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts">
import { LayoutHeader, LayoutSider } from './components';
</script>
<style scoped>
.n-layout-content {
  height: calc(100% - 48px);
}
</style>
