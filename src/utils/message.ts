import { createDiscreteApi } from 'naive-ui';

const useDiscreteApi = () => {
  const { message } = createDiscreteApi(['message'], {
    // configProviderProps: configProviderPropsRef,
  });
  return {
    successMessage: (msg: string) => {
      message.success(msg);
    },
    errorMessage: (msg: string) => {
      message.error(msg);
    },
  };
};

const { successMessage, errorMessage } = useDiscreteApi();
export { successMessage, errorMessage };
