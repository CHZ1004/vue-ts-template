import { defineStore } from 'pinia';
import { STORE_NAMES } from '@/store/store-namespace';

interface AuthState {
  token: string;
  loginLoading: boolean;
}
export const useAuthStore = defineStore(STORE_NAMES.AUTH, {
  state: (): AuthState => ({
    token: '',
    loginLoading: false,
  }),
});
