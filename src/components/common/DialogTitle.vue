<template>
  <div class="w-full h-11 px-5 flex items-center justify-between border-b border-gray-200">
    <h3 class="text-base font-600">{{ title || '标题名称' }}</h3>
    <IconMdiClose class="text-#555F69 cursor-pointer" @click="close" />
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string;
  destroy: () => void;
}
const props = defineProps<Props>();

const close = () => {
  props.destroy && props.destroy();
};
</script>
<style scoped></style>
