import { createApp } from 'vue';
import App from './App.vue';
import AppLoading from '@/components/common/AppLoading.vue';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import { setupEcharts } from '@/lib';
import 'virtual:uno.css';
import '@/styles/css/index.css';

async function init() {
  const appLoading = createApp(AppLoading);
  appLoading.mount('#appLoading');

  const app = createApp(App);
  setupRouter(app);
  await setupStore(app);
  setupEcharts(app);
  appLoading.unmount();
  app.mount('#app');
}
init();
