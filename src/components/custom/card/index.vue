<template>
  <n-card class="relative h-min rounded-md overflow-hidden" hoverable>
    <div class="absolute right-0 top-0">
      <n-popover trigger="hover" raw :show-arrow="false" placement="bottom-end">
        <template #trigger>
          <div class="flex p-4 cursor-pointer">
            <span v-for="dot in 3" :key="dot" class="w-1 h-1 ml-1 rounded-1 bg-icon-color" />
          </div>
        </template>
        <div class="w-28 py-1 text-icon-color bg-white">
          <div class="flex-y-center h-8 px-1 cursor-pointer hover:bg-blue-100" @click="copy(data[value])">
            <icon-ant-design:copy-outlined class="mr-1 text-xl" />
            <span>复制场景</span>
          </div>
          <div class="flex-y-center h-8 px-1 cursor-pointer hover:bg-blue-100">
            <icon-ant-design:edit-twotone class="mr-1 text-xl" />
            <span>编辑场景</span>
          </div>
          <div class="flex-y-center h-8 px-1 cursor-pointer hover:bg-blue-100" @click="move(data)">
            <icon-mdi:file-move-outline class="mr-1 text-xl" />
            <span>移动分组</span>
          </div>
          <div class="flex-y-center h-8 px-1 cursor-pointer hover:bg-blue-100" @click="onDelete(data[value])">
            <icon-mdi:trash-can-outline class="mr-1 text-xl" />
            <span>删除场景</span>
          </div>
        </div>
      </n-popover>
    </div>
    <div class="flex-y-center px-6 py-9">
      <icon-local-card-box class="flex-shrink-0 text-54px" />
      <h4 class="flex-1 ml-4 text-base">{{ data[label] }}</h4>
    </div>
    <div class="flex-y-center justify-between h-11 px-4 text-icon-color bg-gray-50 border-t border-gray-100">
      <AutoInput v-slot="{ show }" :init-value="data[label]" @change="editName">
        <div class="flex">
          <icon-ant-design:edit-twotone class="mr-2 text-xl cursor-pointer" @click="show" />
          <span>{{ data[label] }}</span>
        </div>
      </AutoInput>
      <span class="ml-2 flex-shrink-0">{{ transformDateToYMD(data.createTime) }}</span>
    </div>
  </n-card>
</template>
<script setup lang="ts">
import { Inspection } from '@/api';
import { transformDateToYMD } from '@/utils';

interface Props {
  data: Inspection;
  label?: string;
  value?: string;
}
const emit = defineEmits(['edit', 'copy', 'delete', 'move']);
const props = withDefaults(defineProps<Props>(), {
  label: 'templateName',
  value: 'templateId',
});

const editName = (name: string) => {
  emit('edit', { ...props.data, [props.label]: name });
};
const copy = (id: string) => {
  emit('copy', id);
};
const onDelete = (id: string) => {
  emit('delete', id);
};
const move = (data: Inspection) => {
  emit('move', {
    [props.value]: data[props.value],
    groupId: data.groupId,
  });
};
</script>
<style scoped>
:deep(.n-card__content) {
  --n-padding-bottom: 0px;
  --n-padding-left: 0px;
}
</style>
