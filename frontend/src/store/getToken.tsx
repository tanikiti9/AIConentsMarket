import { user } from '@/components/interface';
import { create } from 'zustand';


type AuthStore = {
  token: string | null;
  user: user | null;
  setAuth: (token: string, user: user) => void;
  clearAuth: () => void;
}

import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => {
        set({ token: null, user: null });
        localStorage.removeItem('auth-storage');
      },
    }),
    { name: 'auth-storage' }
  )
);

export const logout = () => {
  useAuthStore.getState().clearAuth();
  useAuthStore.persist.clearStorage();
  alert('ログアウトしました')
};