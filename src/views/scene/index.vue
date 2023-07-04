<template>
  <div class="h-full flex">
    <SceneGroups />
    <main class="flex-1 flex flex-col ml-4">
      <SceneHeader />
      <SceneCards class="flex-1" />
      <ScenePagination />
    </main>
  </div>
</template>
<script setup lang="ts">
import { SceneGroups, SceneHeader, SceneCards, ScenePagination } from './components';
</script>
<style scoped></style>
