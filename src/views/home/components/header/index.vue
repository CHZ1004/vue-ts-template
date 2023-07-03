<template>
  <n-card>
    <div class="flex justify-between">
      <div class="flex items-center">
        <span>首页</span>
        <icon-mdi:slash-forward />
        <span>{{ title }}</span>
      </div>
      <div class="flex items-center">
        <IconHove class="w-8 h-8 ml-3" tooltip-content="添加场景">
          <icon-mdi:plus class="text-2xl" />
        </IconHove>
        <IconHove class="w-8 h-8 ml-3" tooltip-content="切换场景" @click="add">
          <icon-ant-design:swap-outlined class="text-2xl" />
        </IconHove>
        <IconHove class="w-8 h-8 ml-3" tooltip-content="全屏场景">
          <icon-mdi:fullscreen class="text-2xl" />
        </IconHove>
      </div>
    </div>
  </n-card>
</template>
<script setup lang="ts">
import { h } from 'vue';
import { useDialog } from 'naive-ui';
import { IconHove, DialogTitle, DialogAction, DialogContent } from './components';

defineProps<{
  title: string;
}>();
const dialog = useDialog();
const change = (templateName: string) => {
  console.log('🚀 ~ templateName:', templateName);
};
const add = () => {
  const { destroy } = dialog.create({
    showIcon: false,
    closable: false,
    maskClosable: false,
    autoFocus: false,
    style: { width: '700px' },
    title: () => h(DialogTitle, { destroy, title: '切换设置' }),
    content: () => h(DialogContent, { onChange: change }),
    action: () => h(DialogAction, { destroy }),
  });
};
</script>
<style scoped>
:deep(.n-card__content) {
  --n-padding-bottom: 8px;
  --n-padding-left: 12px;
}
</style>
