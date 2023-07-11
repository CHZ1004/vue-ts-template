<template>
  <AutoInput v-slot="{ show }" @change="addChange">
    <div class="flex-y-center -mx-3">
      <Icon @click="$emit('shrink')">
        <icon-mdi:chevron-right class="text-2xl" />
      </Icon>
      <n-input v-model:value="searchValue" placeholder="输入搜索内容" @input="searchInput" />
      <Icon @click="show">
        <icon-mdi:plus class="text-2xl" />
      </Icon>
    </div>
  </AutoInput>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { debounce } from 'lodash-es';
import Icon from './icon.vue';

const emit = defineEmits(['search', 'add', 'shrink']);
/** 搜索 */
const searchValue = ref('');
const searchInput = debounce(() => {
  emit('search', searchValue.value);
}, 500);

/** 新增 */
const addChange = (value: string) => {
  emit('add', { groupName: value });
};
</script>
<style scoped></style>
