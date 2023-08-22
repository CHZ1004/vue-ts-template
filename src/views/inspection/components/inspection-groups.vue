<template>
  <Groups
    v-model:value="groupId"
    v-model:shrink="group.inspectionCollapse"
    :loading="group.loading"
    :list-data="group.inspectionGroups"
    @search="onSearch"
    @update="onUpdate"
    @delete="onDelete"
  />
</template>
<script setup lang="ts">
import { useInspectionGroups } from '../hooks';

interface Props {
  value: string;
}
const emit = defineEmits(['update:value']);
const props = defineProps<Props>();
const { value } = toRefs(props);
const group = useGroupStore();
const { groupId, onSearch, onUpdate, onDelete } = useInspectionGroups(value, emit);
</script>
<style scoped></style>
