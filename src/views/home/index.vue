<template>
  <div>
    <a-card class="w-68 h-full">
      <Search v-model="searchValue" />
      <div>
        <List></List>
        <!-- <div
          v-for="item in list"
          :key="item.name"
          class="h-10 flex items-center justify-end hover:text-primary"
          :class="{ 'text-primary': currentGroup === item.name }"
          @click="currentGroup = item.name"
        >
          <span class="mr-auto cursor-pointer">{{ item.name }}</span>
          <hover-container class="w-6" @click.stop>
            <form-outlined />
          </hover-container>
          <a-popconfirm title="确定删除该分组吗？" ok-text="确定" cancel-text="取消" @click.stop>
            <hover-container class="w-6">
              <delete-outlined />
            </hover-container>
          </a-popconfirm>
        </div> -->
      </div>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
// import { DeleteOutlined, FormOutlined } from '@ant-design/icons-vue';
import { Search, List } from './components';

const searchValue = ref('');
// const list = [
//   {
//     name: '分组1',
//   },
//   {
//     name: '分组2',
//   },
// ];
// const currentGroup = ref('分组1');
</script>
<style></style>
