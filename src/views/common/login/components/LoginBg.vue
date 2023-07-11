<template>
  <div class="flex-1 flex flex-col justify-between text-white">
    <h1 class="flex items-center">
      <SystemLogin class="w-12 h-12 mr-3" />
      <p class="text-2xl">运营数据多维分析平台</p>
    </h1>
    <div>
      <img :src="box" alt="login-box" class="w-1/2 mb-2" />
      <p>请输入您的账号密码登录使用！</p>
    </div>
    <div></div>
  </div>
</template>
<script setup lang="ts">
import box from '@/assets/svg/login-box-bg.svg';
</script>
<style lang="less" scoped></style>
