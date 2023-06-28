import type { ImportsMap, PresetName } from 'unplugin-auto-import/types';
import type { PluginOption } from 'vite';
import type { Arrayable } from '@vueuse/core';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { resolve } from '../utils';

export function configUnpluginPlugin(viteEnv: ImportMetaEnv): PluginOption[] {
  const { VITE_ICON_PREFFIX, VITE_ICON_LOCAL_PREFFIX } = viteEnv;
  const localIconPath = resolve('src/assets/icons');
  const collectionName = VITE_ICON_LOCAL_PREFFIX.replace(`${VITE_ICON_PREFFIX}-`, '');
  const include = [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/];
  const exclude = [/[\\/]node_modules[\\/]/];
  const imports: Arrayable<ImportsMap | PresetName> = [
    'vue',
    'pinia',
    'vue-router',
    {
      '@vueuse/core': [],
    },
  ];
  return [
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, (svg) => {
          return svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ');
        }),
      },
      scale: 1,
    }),
    AutoImport({
      include,
      exclude,
      imports,
      dirs: ['src/store/modules'],
    }),
    Components({
      exclude,
      dirs: ['src/components/**'],
      extensions: ['vue', 'tsx', 'jsx'],
      resolvers: [IconsResolver({ customCollections: [collectionName], componentPrefix: VITE_ICON_PREFFIX })],
    }),
  ];
}
