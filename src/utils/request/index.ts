import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';
import { getBaseURL } from './helpers';

// interface Result {}
export const alovaInstance = createAlova({
  baseURL: getBaseURL(),
  timeout: 70000,
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  localCache: null,
  beforeRequest(method) {
    // TODO:
    method.config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  },
  responded: {
    onSuccess: async (response) => {
      const data = await response.json();
      return data.data;
    },
    onError: (error) => {
      return error;
    },
  },
});
