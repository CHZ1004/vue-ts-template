<template>
  <div v-if="showTooltip" class="cursor-pointer text-icon-color">
    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <div class="wh-full flex-center bg-gray-100 rounded-md" :class="contentClassName">
          <slot></slot>
        </div>
      </template>
      {{ tooltipContent }}
    </n-tooltip>
  </div>
  <div v-else class="cursor-pointer text-icon-color">
    <div class="wh-full flex-center bg-gray-100 rounded-md" :class="contentClassName">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { PopoverPlacement } from 'naive-ui';

interface Props {
  /** tooltip显示文本 */
  tooltipContent?: string;
  /** tooltip的位置 */
  placement?: PopoverPlacement;
  /** class类 */
  contentClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  tooltipContent: '',
  placement: 'bottom',
  contentClass: '',
});

const showTooltip = computed(() => Boolean(props.tooltipContent));
const contentClassName = computed(() => `${props.contentClass}`);
</script>
<style scoped></style>
