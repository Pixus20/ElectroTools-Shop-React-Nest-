import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../../graphql/cart/getCart';
import { client } from '../../lib/apolloClient';
import { useUserStore } from './useUserStore';

interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  addItem: (newItem: CartItem) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      setItems: (items) => set({ items }),

      addItem: async (newItem) => {
        const user = useUserStore.getState().user;
        const existingItem = get().items.find(
          (item) => item.productId === newItem.productId
        );

        let updatedItems;

        if (existingItem) {
          updatedItems = get().items.map((item) =>
            item.productId === newItem.productId
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        } else {
          updatedItems = [...get().items, newItem];
        }

        set({ items: updatedItems });

        if (user) {
          try {
            await client.mutate({
              mutation: ADD_TO_CART,
              variables: {
                productId: newItem.productId,
                quantity: newItem.quantity,
              },
            });
          } catch (error) {
            console.error('❌ Помилка додавання в БД:', error);
          }
        }
      },

      removeItem: async (productId) => {
        const user = useUserStore.getState().user;
      
        set({
          items: get().items.filter((item) => item.productId !== productId),
        });
      
        if (user) {
          try {
            await client.mutate({
              mutation: REMOVE_FROM_CART,
              variables: { productId },
            });
          } catch (error) {
            console.error('❌ Помилка видалення з БД:', error);
          }
        }
      },

      increaseQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      decreaseQuantity: (productId) => {
        set({
          items: get().items
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
