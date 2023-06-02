import { defineConfig, loadEnv } from 'vite';
import { createVitePlugins, resolve } from './build';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;
  return {
    plugins: [...createVitePlugins(viteEnv)],
    base: './', // 打包路径
    server: {
      port: 8008, // 端口号
      open: false, // 是否自动打开浏览器
      cors: true, // 允许跨域
      proxy: {}, // 代理
    },
    resolve: {
      alias: {
        '@': resolve('src'), // 设置 `@` 指向 `src` 目录
        '#': resolve('types'), // 设置 `@` 指向 `src` 目录
      },
    },
    build: {
      target: 'es2015',
      reportCompressedSize: false,
      sourcemap: false,
    },
  };
});
