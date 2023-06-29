import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';
import { errorMessage, isFormData } from '@/utils';
import { getBaseURL } from './helpers';

// interface Result {}
export const alovaInstance = createAlova({
  baseURL: getBaseURL(),
  timeout: 70000,
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  localCache: null,
  beforeRequest(method) {
    if (!method.config.headers['Content-Type'] && isFormData(method.data)) {
      method.config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    }
  },
  responded: {
    onSuccess: async (response) => {
      const data = await response.json();
      if (response.status === 500) {
        errorMessage('Internal Server Error');
        return Promise.reject(new Error('Internal Server Error'));
      }
      return data.data;
    },
    onError: (error) => {
      console.error('🚀 ~ error:', error);
      return error;
    },
  },
});
