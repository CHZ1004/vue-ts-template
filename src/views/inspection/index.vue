<template>
  <div class="wh-full flex gap-4">
    <InspectionGroups v-model:value="groupId" />
    <InspectionMain :group-id="groupId" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { InspectionMain, InspectionGroups } from './components';

const groupId = ref('');
</script>
<style scoped></style>
