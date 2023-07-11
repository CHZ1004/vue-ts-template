<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" @click="menuClick">
    <a-menu-item key="Home">
      <div class="flex items-center text-base">
        <icon-formkit:group />
        <span class="ml-1">分组管理</span>
      </div>
    </a-menu-item>
    <a-menu-item key="SpecialAccount">
      <div class="flex items-center text-base">
        <icon-iconoir:reports />
        <span class="ml-1">专户报告</span>
      </div>
    </a-menu-item>
    <!-- <a-menu-item key="3">
      <div class="flex items-center text-base">
        <icon-ic:baseline-density-medium />
        <span class="ml-1">nav 3</span>
      </div>
    </a-menu-item> -->
  </a-menu>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const selectedKeys = ref<string[]>([]);

const menuClick = ({ key }: { key: string }) => {
  router.push({ name: key });
};
watch(
  () => route.name,
  (name) => {
    name && (selectedKeys.value = [name as string]);
  },
  {
    immediate: true,
  },
);
</script>
<style scoped></style>
