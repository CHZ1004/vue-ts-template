<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" @click="menuClick">
    <a-menu-item key="Home">
      <Icon>
        <template #component>
          <icon-formkit:group />
        </template>
      </Icon>
      <span class="ml-1">分组管理</span>
    </a-menu-item>
    <a-menu-item key="SpecialAccount">
      <Icon>
        <template #component>
          <icon-iconoir:reports />
        </template>
      </Icon>
      <span>专户报告</span>
    </a-menu-item>
    <a-menu-item key="Daily">
      <Icon>
        <template #component>
          <icon-iconoir:graph-up />
        </template>
      </Icon>
      <span class="ml-1">城投日报</span>
    </a-menu-item>
  </a-menu>
</template>
<script setup lang="ts">
import Icon from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();
const selectedKeys = ref<string[]>([]);

const menuClick = ({ key }: { key: string }) => {
  router.push({ name: key });
};
watch(
  () => route.name,
  (name) => {
    name && (selectedKeys.value = [name as string]);
  },
  {
    immediate: true,
  },
);
</script>
<style scoped></style>
