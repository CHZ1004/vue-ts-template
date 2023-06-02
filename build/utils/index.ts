import path from 'path';

// 获取文件路径
export function resolve(src: string) {
  return path.resolve(process.cwd(), src);
}
