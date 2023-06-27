import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';
import { ContentTypeEnum } from '@/enums';

const { VITE_API_URL, VITE_API_PREFFIX } = import.meta.env;
const baseURL = `${VITE_API_URL}/${VITE_API_PREFFIX}`;

interface Result<T = any> {
  code: number;
  message: string;
  result: T;
  success: boolean;
}
export const alovaInstance = createAlova({
  baseURL,
  timeout: 70000,
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  beforeRequest(method) {
    method.config.headers['Content-Type'] = ContentTypeEnum.JSON;
  },
  responded: async (response) => {
    try {
      const data: Result = await response.json();
      return data.result;
    } catch (error) {
      return error;
    }
  },
});
