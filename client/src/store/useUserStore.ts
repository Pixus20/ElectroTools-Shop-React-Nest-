import { create } from 'zustand';

interface User {
  id: string;
  name: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  loadUserFromStorage: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },

  loadUserFromStorage: () => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        set({ user: parsed });
      } catch {
        set({ user: null });
      }
    }
  },
}));
