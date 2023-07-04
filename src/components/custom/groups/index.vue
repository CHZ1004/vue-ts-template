<template>
  <n-card :class="shrink ? 'w-max' : 'w-65 h-full p-4'">
    <GroupIcon v-if="shrink" @click="setShrink(false)">
      <icon-mdi:chevron-right class="text-2xl" />
    </GroupIcon>
    <n-spin v-else :show="loading" class="group-spin h-full">
      <n-space vertical :size="16">
        <GroupSearch @search="$emit('search', $event)" @add="$emit('update', $event)" @shrink="setShrink(true)" />
        <GroupList
          v-model:value="currentGroupId"
          :list-data="listData"
          @update="$emit('update', $event)"
          @delete="$emit('delete', $event)"
        />
      </n-space>
    </n-spin>
  </n-card>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { InspectionGroup, SceneGroup } from '@/api';
import { GroupSearch, GroupList, GroupIcon } from './components';

type Group = SceneGroup | InspectionGroup;
interface Props {
  loading: boolean;
  listData: Array<Group>;
}
const emit = defineEmits(['update', 'delete', 'search', 'change']);
defineProps<Props>();

const shrink = ref(false);
const setShrink = (value: boolean) => {
  shrink.value = value;
};

const currentGroupId = ref<string>('');
watch(
  () => currentGroupId.value,
  (value) => {
    emit('change', value);
  },
  {
    // immediate: true,
  },
);
</script>
<style scoped>
:deep(.n-card__content) {
  --n-padding-bottom: 0px;
  --n-padding-left: 0px;
}
</style>
