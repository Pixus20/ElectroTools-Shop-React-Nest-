import { create } from 'zustand';

interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isSynced: boolean;
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  setIsSynced: (value: boolean) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isSynced: false,

  setItems: (items) => set({ items }),
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
    increaseQuantity: (productId) =>
      set((state) => {
        console.log('Increase quantity for:', productId);
        return {
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }),
    
    decreaseQuantity: (productId) =>
      set((state) => {
        console.log('Decrease quantity for:', productId);
        return {
          items: state.items
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        };
      }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    })),
  clearCart: () => set({ items: [], isSynced: false }),
  setIsSynced: (value) => set({ isSynced: value }),
}));