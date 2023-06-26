<template>
  <n-layout has-sider>
    <LayoutSider></LayoutSider>
    <n-layout>
      <LayoutHeader></LayoutHeader>
      <n-layout-content>
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts">
import { LayoutHeader, LayoutSider } from './components';
</script>
<style lang="less" scoped></style>
