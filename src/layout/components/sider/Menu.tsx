import { defineComponent, h, computed } from 'vue';
import { MenuOption, NMenu } from 'naive-ui';
import { useRouter, useRoute } from 'vue-router';
import { toLower } from 'lodash-es';

const images = import.meta.glob<typeof import('*.png')>('@/assets/images/**/*.png');
const RenderIcon = defineComponent({
  props: {
    type: String,
  },
  setup(props) {
    const route = useRoute();
    const type = toLower(props.type);
    const isActive = computed(() => props.type === route.name);
    const keys = Object.keys(images);
    const src = computed(() => {
      return keys.filter((key) => {
        const filter = `${type}${isActive.value ? '-active' : '.png'}`;
        return key.includes(filter);
      })[0];
    });
    return () => <img class="w-5 h-5" src={src.value}></img>;
  },
});

export const Menu = defineComponent({
  name: 'LayoutSiderMenu',
  props: {
    collapsed: Boolean,
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const activeKey = computed<string>(() => (route.name || '') as string);
    const menus: MenuOption[] = [
      {
        title: '首页',
        key: 'HOME',
        path: '/home',
        icon: () => h(RenderIcon, { type: 'HOME' }),
      },
      {
        title: '场景管理',
        key: 'SCENE',
        path: '/scene',
        icon: () => h(RenderIcon, { type: 'SCENE' }),
      },
      {
        title: '巡检管理',
        key: 'INSPECTION',
        path: '/inspection',
        icon: () => h(RenderIcon, { type: 'INSPECTION' }),
      },
    ];
    const handleUpdateMenu = (_key: string, item: MenuOption) => {
      router.push({ name: item.key as string });
    };
    return () => (
      <NMenu
        value={activeKey.value}
        collapsed={props.collapsed}
        collapsed-width={64}
        options={menus}
        onUpdateValue={handleUpdateMenu}
      />
    );
  },
});
