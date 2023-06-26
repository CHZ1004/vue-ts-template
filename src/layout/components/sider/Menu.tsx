import { defineComponent, ref } from 'vue';
import { MenuOption, NMenu } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { useAppStore } from '@/store';

const renderLabel = (title: string) => {
  return <RouterLink to="/login">{title}</RouterLink>;
};

export const Menu = defineComponent({
  name: 'LayoutSiderMenu',
  setup() {
    const app = useAppStore();
    const activeKey = ref<string>('');
    const expandedKeys = ref<string[]>([]);
    const menus: MenuOption[] = [
      {
        label: () => renderLabel('登录'),
        key: 'login',
      },
    ];
    return () => (
      <NMenu
        value={activeKey.value}
        collapsed={app.siderCollapse}
        collapsed-width={62}
        options={menus}
        expanded-keys={expandedKeys.value}
      ></NMenu>
    );
  },
});
