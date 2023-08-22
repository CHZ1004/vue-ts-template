<template>
  <Groups
    v-model:value="groupId"
    v-model:shrink="group.sceneCollapse"
    :loading="group.loading"
    :list-data="group.sceneGroups"
    @search="onSearch"
    @update="onUpdate"
    @delete="onDelete"
  />
</template>
<script setup lang="ts">
import { useSceneGroups } from '../hooks';

interface Props {
  value: string;
}
const emit = defineEmits(['update:value']);
const props = defineProps<Props>();
const { value } = toRefs(props);
const { group, groupId, onSearch, onUpdate, onDelete } = useSceneGroups(value, emit);
</script>
<style scoped></style>
