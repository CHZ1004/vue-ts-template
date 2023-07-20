import { message } from 'ant-design-vue';

export function successMessage(msg: string) {
  message.success(msg);
}

export function errorMessage(msg: string) {
  message.error(msg);
}
