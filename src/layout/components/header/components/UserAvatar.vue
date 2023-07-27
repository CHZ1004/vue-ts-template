<template>
  <n-dropdown :options="options" @select="handleDropdown">
    <hover-container class="h-full px-3">
      <n-avatar round></n-avatar>
    </hover-container>
  </n-dropdown>
</template>
<script setup lang="ts">
import { DropdownOption } from 'naive-ui';

const auth = useAuthStore();

const options: DropdownOption[] = [
  {
    label: '退出登录',
    key: 'logout',
  },
];
const handleDropdown = () => {
  auth.logout();
};
</script>
<style scoped></style>
