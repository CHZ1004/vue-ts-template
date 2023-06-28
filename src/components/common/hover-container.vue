<template>
  <div v-if="showTooltip">
    <a-tooltip v-if="showTooltip" :placement="placement" trigger="hover">
      <template #title>
        <div class="flex-center h-full cursor-pointer hover:bg-#eee">
          <slot></slot>
        </div>
      </template>
      {{ content }}
    </a-tooltip>
  </div>
  <div v-else class="flex-center h-full cursor-pointer">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  placement?: string;
  content?: string;
}
const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom',
  content: '',
});

const showTooltip = computed(() => Boolean(props.content));
</script>
<style scoped></style>
