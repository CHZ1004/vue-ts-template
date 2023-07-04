<template>
  <div :class="clasess">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
const clasess = 'w-6 h-6 flex-center m-1 hover:bg-primary text-icon-color hover:text-white cursor-pointer rounded';
</script>
<style scoped></style>
