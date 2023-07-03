import { createDiscreteApi } from 'naive-ui';

const useDiscreteApi = () => {
  const { message } = createDiscreteApi(['message'], {
    // configProviderProps: configProviderPropsRef,
  });
  return {
    successMessage: (msg: string) => {
      message.success(msg);
    },
  };
};

const { successMessage } = useDiscreteApi();
export { successMessage };
