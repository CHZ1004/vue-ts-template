import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import progress from 'vite-plugin-progress';
import UnoCSS from 'unocss/vite';
import type { PluginOption } from 'vite';
import { configCompressPlugin } from './compression';
import { configUnpluginPlugin } from './unplugin';
import { configVisualizerConfig } from './visualizer';

export function createVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  const plugins: PluginOption[] = [vue(), jsx(), progress(), UnoCSS()];
  plugins.push(...configUnpluginPlugin(viteEnv));
  // 压缩
  viteEnv.VITE_VISUALIZER === 'Y' && plugins.push(configCompressPlugin(viteEnv));
  // 资源分析文件
  viteEnv.VITE_COMPRESS === 'Y' && plugins.push(configVisualizerConfig());

  return plugins;
}
