'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { loginApi } from '../lib/api/auth';
import { tokenStorage } from '../lib/auth/token-storage';
import { LoginPayload, User } from '../types/auth';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => tokenStorage.get());
  const [user, setUser] = useState<User | null>(null);

  const login = async (payload: LoginPayload): Promise<void> => {
    const result = await loginApi(payload);
    tokenStorage.set(result.token);
    setToken(result.token);
    setUser(result.user);
  };

  const logout = () => {
    tokenStorage.clear();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, login, logout, isAuthenticated: Boolean(token) }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
