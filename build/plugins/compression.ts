import { compression } from 'vite-plugin-compression2';

/**
 * vite压缩插件
 * @param compress 压缩算法
 * @returns vite插件
 */
export function configCompressPlugin(viteEnv: ImportMetaEnv) {
  const { VITE_COMPRESS_TYPE = 'gzip' } = viteEnv;
  return compression({
    algorithm: VITE_COMPRESS_TYPE,
  });
}
