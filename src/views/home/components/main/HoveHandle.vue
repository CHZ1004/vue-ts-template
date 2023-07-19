<template>
  <div class="relative" @mouseenter="setTrue" @mouseleave="setFalse">
    <slot name="default"></slot>
    <div v-show="isHover" class="absolute flex gap-1 w-92px z-10" :class="placementClass">
      <slot name="handle">
        <icon-hove v-if="!addHide" class="w-7 h-7" @click="$emit('add')">
          <IconMdiPlus class="text-2xl" />
        </icon-hove>
        <icon-hove v-if="!deleteHide" class="w-7 h-7" @click="$emit('delete')">
          <IconMdiMinus class="text-2xl" />
        </icon-hove>
        <icon-hove v-if="!moveHide" class="w-7 h-7 handle">
          <IconMdiCursorMove class="text-2xl" />
        </icon-hove>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useBoolean } from '@/hooks';

type PlacementType = 'top-start' | 'top-end' | 'top-center' | 'bottom-start' | 'bottom-end' | 'bottom-center';
interface Props {
  placement?: PlacementType;
  addHide?: boolean;
  deleteHide?: boolean;
  moveHide?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  placement: 'top-end',
  addHide: false,
  deleteHide: false,
  moveHide: false,
});
defineEmits(['add', 'delete']);
const { bool: isHover, setFalse, setTrue } = useBoolean(false);

const classes: Record<PlacementType, string> = {
  'top-start': '-top-7',
  'top-center': '-top-7  left-[calc(50%-46px)]',
  'top-end': '-top-7 right-0 justify-end',
  'bottom-start': '-bottom-7',
  'bottom-center': '-bottom-0 left-[calc(50%-46px)] justify-center',
  'bottom-end': '-bottom-0 right-0',
};
const placementClass = computed(() => classes[props.placement]);
</script>
<style lang="less" scoped></style>
