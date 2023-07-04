<template>
  <n-card class="relative h-fit rounded-md overflow-hidden">
    <div class="absolute right-0 top-0">
      <n-popover trigger="hover" raw :show-arrow="false" placement="bottom-end">
        <template #trigger>
          <div class="flex p-4 cursor-pointer">
            <span v-for="dot in 3" :key="dot" class="w-1 h-1 ml-1 rounded-1 bg-icon-color" />
          </div>
        </template>
        <div class="w-28 py-1 text-icon-color bg-white">
          <div class="flex-y-center h-8 px-1 cursor-pointer hover:bg-blue-100">
            <icon-ant-design:copy-outlined class="mr-1 text-xl" />
            <span>复制</span>
          </div>
          <div class="flex-y-center h-8 px-1 cursor-pointer hover:bg-blue-100">
            <icon-ant-design:edit-twotone class="mr-1 text-xl" />
            <span>编辑</span>
          </div>
          <div class="flex-y-center h-8 px-1 cursor-pointer hover:bg-blue-100">
            <icon-mdi:file-move-outline class="mr-1 text-xl" />
            <span>移动分组</span>
          </div>
          <div class="flex-y-center h-8 px-1 cursor-pointer hover:bg-blue-100">
            <icon-mdi:trash-can-outline class="mr-1 text-xl" />
            <span>删除</span>
          </div>
        </div>
      </n-popover>
    </div>
    <div class="flex-y-center px-6 py-9">
      <icon-local-card-box class="flex-shrink-0 text-54px" />
      <h4 class="flex-1 ml-4 text-base">测试联合场景</h4>
    </div>
    <div class="flex-y-center justify-between h-11 px-4 text-icon-color bg-gray-50 border-t border-gray-100">
      <AutoInput v-slot="{ show }">
        <div class="flex">
          <icon-ant-design:edit-twotone class="mr-2 text-xl cursor-pointer" @click="show" />
          <span>测试联合场景</span>
        </div>
      </AutoInput>
      <span class="ml-2 flex-shrink-0">2023-02-20</span>
    </div>
  </n-card>
</template>
<script setup lang="ts"></script>
<style scoped>
:deep(.n-card__content) {
  --n-padding-bottom: 0px;
  --n-padding-left: 0px;
}
</style>
