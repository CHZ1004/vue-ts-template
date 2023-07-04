<template>
  <div
    :class="clasess(groupData.groupId)"
    @mouseenter="setTrue"
    @mouseleave="setFalse"
    @click="$emit('update:value', groupData.groupId)"
  >
    <AutoInput v-slot="{ show }" :init-value="groupData.groupName" @change="change">
      <n-ellipsis>{{ groupData.groupName }}</n-ellipsis>
      <span v-show="!showOper" class="flex-shrink-0 pl-2">{{ groupData.count }}</span>
      <div v-show="showOper" class="flex-shrink-0 flex">
        <n-button strong secondary circle type="primary" size="small" class="mr-1" @click.stop="show">
          <template #icon>
            <icon-mdi:square-edit-outline class="text-base" />
          </template>
        </n-button>
        <n-popconfirm @positive-click="$emit('delete', groupData.groupId)">
          <template #trigger>
            <n-button strong secondary circle type="primary" size="small" @click.stop>
              <template #icon>
                <icon-mdi:trash-can-outline class="text-base" />
              </template>
            </n-button>
          </template>
          确定删除【{{ groupData.groupName }}】吗?
        </n-popconfirm>
      </div>
    </AutoInput>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useBoolean } from '@/hooks';
import { SceneGuoup } from '@/api';

interface Emit {
  (e: 'update:value', id: string): void;
  (e: 'update', data: Partial<SceneGuoup>): void;
  (e: 'delete', id: string): void;
}
interface Props {
  value: string;
  groupData: SceneGuoup;
}
const emit = defineEmits<Emit>();
const props = defineProps<Props>();
const clasess = computed(() => {
  const baseClass = 'flex-y-center justify-between h-10 px-3 rounded cursor-pointer hover:text-primary';
  const hoverClass = 'bg-blue-100 text-primary';
  return (id: string) => {
    return props.value === id ? `${baseClass} ${hoverClass}` : baseClass;
  };
});
const { bool, setTrue, setFalse } = useBoolean();
const showOper = computed(() => {
  return bool.value && Boolean(parseInt(props.groupData.groupId, 10));
});

const change = (value: string) => {
  emit('update', { groupName: value, groupId: props.groupData.groupId });
};
</script>
<style scoped></style>
