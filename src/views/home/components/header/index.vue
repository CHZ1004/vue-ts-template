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
        <IconHove class="w-8 h-8 ml-3" tooltip-content="切换场景" @click="open">
          <icon-ant-design:swap-outlined class="text-2xl" />
        </IconHove>
        <IconHove class="w-8 h-8 ml-3" tooltip-content="全屏场景" @click="$emit('fullscreen')">
          <icon-mdi:fullscreen class="text-2xl" />
        </IconHove>
      </div>
    </div>
  </n-card>
</template>
<script setup lang="ts">
import { h, ref } from 'vue';
import { useSwitchDialog } from '@/hooks';
import { IconHove, Content } from './components';

interface Props {
  title: string;
}
const props = defineProps<Props>();
const emit = defineEmits(['refresh', 'fullscreen']);

const refresh = ref(true);
const onChange = (name: string) => {
  refresh.value = props.title === name;
};
const { open } = useSwitchDialog({
  success: () => {
    !refresh.value && emit('refresh');
  },
  options: {
    title: '切换设置',
    style: { width: '700px' },
    content: () => h(Content, { onChange }),
  },
});
</script>
<style scoped>
:deep(.n-card__content) {
  --n-padding-bottom: 8px;
  --n-padding-left: 12px;
}
</style>
