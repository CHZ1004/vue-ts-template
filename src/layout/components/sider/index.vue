<template>
  <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="app.siderCollapse">
    <div class="transition-all">
      <LayoutLogo :show-title="!app.siderCollapse" />
      <n-menu
        :value="activeKey"
        :collapsed="app.siderCollapse"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        @update:value="handleUpdateMenu"
      />
    </div>
  </n-layout-sider>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { MenuOption } from 'naive-ui';
import { useRoute, useRouter } from 'vue-router';
import { LayoutLogo } from '@/layout/components';
import { useAppStore, useRouteStore } from '@/store';

const route = useRoute();
const router = useRouter();
const app = useAppStore();
const routeStore = useRouteStore();
const menuOptions = routeStore.initStaticRoute();
const activeKey = computed(() => route.name);
const handleUpdateMenu = (_key: string, item: MenuOption) => {
  router.push({ name: item.key as string });
};
</script>
<style>
.n-menu .n-menu-item {
  margin-top: 0;
}
.n-menu .n-menu-item-content::before {
  left: 0;
  right: 0;
}
</style>
