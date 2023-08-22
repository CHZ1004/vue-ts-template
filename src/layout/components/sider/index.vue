<template>
  <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="app.siderCollapse">
    <div class="h-full transition-all">
      <LayoutLogo :show-title="!app.siderCollapse" />
      <Menu :collapsed="app.siderCollapse" />
      <!-- <div class="w-10 h-10 mx-auto bg-gray-100 rounded-lg overflow-hidden">
        <div class="flex flex-col" @mouseenter="aaa = false" @mouseleave="aaa = true">
          <Transition mode="out-in">
            <div v-if="aaa" class="w-10 h-10 flex-center flex-shrink-0">
              <icon-local-sunny class="text-2xl" />
            </div>
            <div v-else class="w-10 h-10 flex-center flex-shrink-0">
              <icon-local-sunny:hove class="text-2xl" />
            </div>
          </Transition>
        </div>
      </div> -->
    </div>
  </n-layout-sider>
</template>
<script setup lang="ts">
import { LayoutLogo } from '@/layout/components';
import { useAppStore } from '@/store';
import { Menu } from './Menu';

const app = useAppStore();
</script>
<style>
.n-menu .n-menu-item-content::before {
  left: 12px;
  right: 12px;
  top: 1px;
  bottom: 1px;
  border-radius: 10px;
}
</style>
