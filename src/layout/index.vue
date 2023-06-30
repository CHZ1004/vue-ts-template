<template>
  <n-layout has-sider>
    <LayoutSider></LayoutSider>
    <n-layout>
      <LayoutHeader></LayoutHeader>
      <n-layout-content class="p-4 flex-1 bg-warm-gray-100">
        <router-view></router-view>
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
