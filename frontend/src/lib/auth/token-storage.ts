const ACCESS_TOKEN_KEY = 'onyx_access_token';

export const tokenStorage = {
  get(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  set(token: string): void {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
  },
  clear(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }
};
