<template>
  <div class="flex items-center h-12 px-6">
    <icon-mdialien-outline class="flex-shrink-0 text-3xl" />
    <h3 v-show="!showTitle" class="mb-0 ml-2 truncate">标题标题</h3>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  showTitle: boolean;
}>();
</script>
<style scoped></style>
