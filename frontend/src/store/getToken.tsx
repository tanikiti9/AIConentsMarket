import { user } from '@/components/interface';
import { create } from 'zustand';


type AuthStore = {
    token: string | null;
    user: user | null;
    setAuth: (token: string, user: user) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: null,
    user: null,
    setAuth: (token, user) => set({token, user}),
    clearAuth: () => set({token: null, user: null})
}))

// リロードしても保存
// import { persist } from 'zustand/middleware';

// export const useAuthStore = create<AuthStore>()(
//   persist(
//     (set) => ({
//       token: null,
//       user: null,
//       setAuth: (token, user) => set({ token, user }),
//       clearAuth: () => set({ token: null, user: null }),
//     }),
//     { name: 'auth-storage' } // localStorageのキー名
//   )
// );