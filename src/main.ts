import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';
import 'virtual:uno.css';
import 'ant-design-vue/dist/antd.variable.min.css';
import '@/styles/css/index.css';

function setup() {
  const app = createApp(App);
  app.use(Antd);
  setupRouter(app);
  setupStore(app);

  app.mount('#app');
}

setup();
