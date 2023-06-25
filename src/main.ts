import { createApp } from 'vue';
import App from './App.vue';
import AppLoading from '@/components/common/AppLoading.vue';
import { setupRouter } from '@/router';
import 'virtual:uno.css';
import '@/styles/css/index.css';

async function init() {
  const appLoading = createApp(AppLoading);
  appLoading.mount('#appLoading');

  const app = createApp(App);
  setupRouter(app);

  appLoading.unmount();
  app.mount('#app');
}
init();
