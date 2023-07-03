import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno({ dark: 'class' })],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex items-center justify-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
  },
  theme: {
    colors: {
      'icon-color': '#6D7A99',
    },
  },
});
