import { visualizer } from 'rollup-plugin-visualizer';

export function configVisualizerConfig() {
  return visualizer({
    // filename: './node_modules/.cache/visualizer/stats.html',
    open: false,
    emitFile: false,
    gzipSize: true,
    brotliSize: true,
  });
}
