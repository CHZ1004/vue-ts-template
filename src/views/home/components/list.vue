<template>
  <div
    v-for="item in list"
    :key="item.name"
    class="h-10 flex items-center justify-end hover:text-primary"
    :class="{ 'text-primary': currentGroup === item.name }"
    @click="currentGroup = item.name"
  >
    <Item></Item>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Item from './item.vue';

const list = [
  {
    name: '分组1',
  },
  {
    name: '分组2',
  },
];
const currentGroup = ref('分组1');
</script>
<style lang="less" scoped></style>
