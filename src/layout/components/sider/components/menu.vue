<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" @click="menuClick">
    <a-menu-item key="1">
      <user-outlined />
      <span class="text-base">分组管理</span>
    </a-menu-item>
    <a-menu-item key="2">
      <video-camera-outlined />
      <span class="text-base">nav 2</span>
    </a-menu-item>
    <a-menu-item key="3">
      <upload-outlined />
      <span class="text-base">nav 3</span>
    </a-menu-item>
  </a-menu>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue';

const selectedKeys = ref<string[]>(['1']);

const menuClick = (item: any) => {
  console.log('🚀 ~ item:', item);
};
</script>
<style scoped></style>
