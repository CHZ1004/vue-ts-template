<template>
  <n-card>
    <div class="flex justify-between">
      <div class="flex items-center">
        <span>首页</span>
        <icon-mdi:slash-forward />
        <span>{{ title }}</span>
      </div>
      <div class="flex items-center">
        <IconHove class="w-8 h-8 ml-3" tooltip-content="添加场景" @click="sceneOpen">
          <icon-mdi:plus class="text-2xl" />
        </IconHove>
        <IconHove class="w-8 h-8 ml-3" tooltip-content="切换场景" @click="switchOpen">
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
import { useSceneDialog, useSwitchDialog } from '@/hooks';
import SceneModel from '@/components/custom/sceneModel/index.vue';
import { sceneSave } from '@/api';
import { successMessage } from '@/utils';
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
const { open: switchOpen } = useSwitchDialog({
  success: () => {
    !refresh.value && emit('refresh');
  },
  options: {
    title: '切换设置',
    style: { width: '700px' },
    content: () => h(Content, { onChange }),
  },
});
const sceneRef = ref<InstanceType<typeof SceneModel> | null>(null);
const { open: sceneOpen } = useSceneDialog({
  success: async () => {
    const res = await sceneRef.value?.confirm();
    await sceneSave(res).send();
    successMessage('新增成功');
  },
  options: {
    title: '新增场景',
    content: () => {
      return h(SceneModel, {
        ref: sceneRef,
      });
    },
    style: { width: '60vw' },
  },
});
</script>
<style scoped>
:deep(.n-card__content) {
  --n-padding-bottom: 8px;
  --n-padding-left: 12px;
}
</style>
