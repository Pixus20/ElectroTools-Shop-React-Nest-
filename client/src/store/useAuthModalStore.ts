import { create } from 'zustand';

interface AuthModalState {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeAll: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isLoginOpen: false,
  isRegisterOpen: false,
  openLogin: () => {
    set({ isRegisterOpen: false });
    setTimeout(() => set({ isLoginOpen: true }), 300);
  },
  openRegister: () => {
    set({ isLoginOpen: false });
    setTimeout(() => set({ isRegisterOpen: true }), 300);
  },
  closeAll: () =>
    set({
      isLoginOpen: false,
      isRegisterOpen: false,
    }),
}));


