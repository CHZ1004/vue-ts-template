<template>
  <header class="flex">
    <n-space class="w-full">
      <n-button type="primary">
        <template #icon>
          <icon-mdi:plus class="text-2xl" />
        </template>
        新建
      </n-button>
      <n-input placeholder="请输入场景名称" />
      <n-button type="primary" ghost>重置</n-button>
      <n-button type="primary">搜索</n-button>
    </n-space>
  </header>
</template>
<script setup lang="ts"></script>
<style scoped></style>
