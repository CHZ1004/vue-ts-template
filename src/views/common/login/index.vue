<template>
  <div class="login-page flex px-48 py-24">
    <LoginBg />
    <LoginForm />
  </div>
</template>
<script setup lang="ts">
import { LoginBg, LoginForm } from './components';
</script>
<style scoped>
.login-page::before {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  margin-left: -50%;
  background-image: url(@/assets/svg/login-bg.svg);
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  content: '';
  z-index: -1;
}
</style>
