import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name: string) => void;
  signup: (email: string, name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, name) => {
        // Mock login
        const user = { id: Math.random().toString(36).substr(2, 9), name, email };
        set({ user, isAuthenticated: true });
      },
      signup: (email, name) => {
        // Mock signup
        const user = { id: Math.random().toString(36).substr(2, 9), name, email };
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'minddump-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
