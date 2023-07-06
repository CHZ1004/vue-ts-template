<template>
  <n-card :class="shrink ? 'w-max absolute z-10' : 'w-65 h-full p-4'">
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
import { computed } from 'vue';
import { Group } from '@/api';
import { GroupSearch, GroupList, GroupIcon } from './components';

type GroupType = Group;
interface Props {
  /** 当前选中的分组id */
  value: string;
  /** 分组展开状态 */
  shrink: boolean;
  /** 加载loading */
  loading: boolean;
  /** 分组数据 */
  listData: Array<GroupType>;
}
const emit = defineEmits(['update', 'delete', 'search', 'update:value', 'update:shrink']);
const props = defineProps<Props>();

const setShrink = (value: boolean) => {
  emit('update:shrink', value);
};

const currentGroupId = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit('update:value', value);
  },
});
</script>
<style scoped>
:deep(.n-card__content) {
  --n-padding-bottom: 0px;
  --n-padding-left: 0px;
}
</style>
