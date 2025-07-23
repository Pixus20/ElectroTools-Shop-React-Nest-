'use client';

import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { ADD_TO_CART } from '../../../graphql/cart/getCart';

export const CartSync = () => {
  const { items, clearCart } = useCartStore();
  const user = useUserStore((state) => state.user);
  const [addToCart] = useMutation(ADD_TO_CART);

  useEffect(() => {
    const syncCart = async () => {
      if (!user || !items.length) return;

      try {
        for (const item of items) {
          await addToCart({
            variables: {
              productId: item.productId,
              quantity: item.quantity,
            },
          });
        }
        clearCart(); 
      } catch (error) {
        console.error('❌ Помилка при синхронізації корзини:', error);
      }
    };

    syncCart();
  }, [user]);

  return null;
};
