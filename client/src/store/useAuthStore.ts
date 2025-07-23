import { create } from 'zustand';
import { useCartStore } from './useCartStore';
import { useUserStore } from './useUserStore';

interface AuthStore {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  setAuthFromStorage: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,

  login: () => {
    localStorage.setItem('token', 'your_token');
    set({ isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    useCartStore.getState().clearCart();
    useUserStore.getState().logout();
    set({ isAuthenticated: false });
  },

  setAuthFromStorage: () => {
    const token = localStorage.getItem('token');
    set({ isAuthenticated: !!token });
  },
}));
