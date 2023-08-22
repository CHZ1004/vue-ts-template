<template>
  <div class="wh-full flex gap-4">
    <SceneGroups v-model:value="groupId" />
    <SceneMain :group-id="groupId" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { SceneMain, SceneGroups } from './components';

const groupId = ref('');
</script>
<style scoped></style>
