import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno()],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex items-center justify-center',
  },
  theme: {
    colors: {
      primary: 'var(--ant-primary-color)',
      primary_hover: 'var(--ant-primary-color-hover)',
      primary_1: 'var(--ant-primary-1)',
      primary_2: 'var(--ant-primary-2)',
      primary_3: 'var(--ant-primary-3)',
      primary_4: 'var(--ant-primary-4)',
      primary_5: 'var(--ant-primary-5)',
      primary_6: 'var(--ant-primary-6)',
      primary_7: 'var(--ant-primary-7)',
      primary_8: 'var(--ant-primary-8)',
      primary_9: 'var(--ant-primary-9)',
      primary_10: 'var(--ant-primary-10)',
    },
  },
});
