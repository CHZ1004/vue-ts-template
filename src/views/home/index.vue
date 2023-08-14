<template>
  <div class="flex flex-col gap-4">
    <HomeHeader :title="data?.templateName || ''" @refresh="send" @fullscreen="enter" />
    <main ref="main" class="flex-1 overflow-hidden" :class="{ 'p-4 bg-warm-gray-100': isFullscreen }">
      <HomeMain class="h-full" :data="data" />
    </main>
  </div>
</template>
<script setup lang="ts">
import { HomeHeader, HomeMain } from './components';

const main = ref<HTMLElement | null>(null);
const { enter, isFullscreen } = useFullscreen(main);

const { data, send } = useRequest(getDefaultScene, { initialData: { templateData: '[]' } });
// onSuccess(({ data }) => {
//   console.log('🚀 ~ data:', data);
// });
</script>
<style scoped></style>
