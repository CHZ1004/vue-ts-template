<template>
  <div class="flex">
    <SiderGroup class="flex-shrink-0" @change="change"></SiderGroup>
    <Combination class="flex-1" :combination-id="currentGroupId"></Combination>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { SiderGroup, Combination } from './components';

const currentGroupId = ref<string>('');
const change = (id: string) => {
  currentGroupId.value = id;
};
</script>
<style></style>
