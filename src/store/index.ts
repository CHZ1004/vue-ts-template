import type { App } from 'vue';
import { createPinia } from 'pinia';
// import

export * from './modules';
export async function setupStore(app: App) {
  const store = createPinia();
  app.use(store);
}

export * from './modules';
export * from './subscribe';
