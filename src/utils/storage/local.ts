import { decrypto, encrypto } from '../crypto';
import { STORAGE_NAMES } from '@/enums';

interface StorageData<T> {
  value: T;
  expire: number | null;
}
interface Local {
  [STORAGE_NAMES.TOKEN]: string;
}

class CreateLocalStorage<T extends Local = Local> {
  private DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

  public set<K extends keyof T>(key: K, value: T[K], expire: number | null = this.DEFAULT_CACHE_TIME) {
    const storageData: StorageData<T[K]> = {
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    };
    const json = encrypto(storageData);
    window.localStorage.setItem(key as string, json);
  }

  public get<K extends keyof T>(key: K) {
    const json = window.localStorage.getItem(key as string);
    let storageData: StorageData<T[K]> | null = null;
    if (!json || !storageData) return null;
    try {
      storageData = decrypto(json);
      const { value, expire } = storageData!;
      if (expire === null || expire >= Date.now()) {
        return value;
      }
      this.remove(key as string);
      return null;
    } catch (error) {
      return null;
    }
  }

  public remove(key: string) {
    window.localStorage.removeItem(key);
  }

  public clear() {
    window.localStorage.clear();
  }
}

export const local = new CreateLocalStorage();
