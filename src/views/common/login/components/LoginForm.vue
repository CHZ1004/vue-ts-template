<template>
  <div class="flex-1 flex items-center justify-center">
    <n-form ref="formRef" :model="formData" :rules="rules" class="w-92">
      <h3 class="mb-4 text-2xl font-bold text-center">登录</h3>
      <n-form-item label="账号" path="username">
        <n-input v-model:value="formData.username"></n-input>
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input v-model:value="formData.password" type="password" show-password-on="click"></n-input>
      </n-form-item>
      <n-button type="primary" class="w-full">登录</n-button>
    </n-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { FormInst } from 'naive-ui';

const formRef = ref<FormInst | null>(null);
const formData = ref({
  username: 'admin',
  password: 'admin',
});
const rules = {
  username: {
    required: true,
    message: '请输入账号',
    trigger: ['input'],
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['input'],
  },
};
</script>
<style scoped></style>
