<template>
  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :item-count="100"
    :page-sizes="[10, 20, 30, 40, 50]"
    :page-slot="7"
    show-quick-jumper
    show-size-picker
    class="ml-auto mt-4"
  >
    <template #prefix="{ itemCount }">共{{ itemCount }}条</template>
  </n-pagination>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const page = ref(2);
const pageSize = ref(20);
</script>
<style scoped></style>
