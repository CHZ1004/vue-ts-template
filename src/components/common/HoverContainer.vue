<template>
  <div v-if="showTooltip">
    <n-tooltip :placement="placement" trigger="hover">
      <template #trigger>
        <div class="flex-center h-full cursor-pointer" :class="contentClassName">
          <slot></slot>
        </div>
      </template>
      {{ tooltipContent }}
    </n-tooltip>
  </div>
  <div v-else class="flex-center cursor-pointer" :class="contentClassName">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { PopoverPlacement } from 'naive-ui';
import { computed } from 'vue';

interface Props {
  /** tooltip显示文本 */
  tooltipContent?: string;
  /** tooltip的位置 */
  placement?: PopoverPlacement;
  /** class类 */
  contentClass?: string;
  /** 是否需要hover背景色 */
  background?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  tooltipContent: '',
  placement: 'bottom',
  contentClass: '',
  background: true,
});
const showTooltip = computed(() => Boolean(props.tooltipContent));
const contentClassName = computed(() => {
  const bgClass = props.background ? ' hover:bg-#f6f6f6 dark:hover:bg-#333' : '';
  return `${props.contentClass}${bgClass}`;
});
</script>
<style scoped></style>
