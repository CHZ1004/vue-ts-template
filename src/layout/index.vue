<template>
  <a-layout class="h-full">
    <LayoutSider></LayoutSider>
    <a-layout>
      <LayoutHeader></LayoutHeader>
      <a-layout-content class="p-4">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in" appear>
            <component :is="Component" :key="route.fullPath" class="h-full" />
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { LayoutSider, LayoutHeader } from './components';
</script>
<style></style>
