
'use client';

import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { ADD_TO_CART, CLEAR_CART } from '../../../graphql/cart/getCart';

export const CartSync = () => {
  const { items, clearCart, isSynced, setIsSynced } = useCartStore();
  const user = useUserStore((state) => state.user);
  const [addToCart] = useMutation(ADD_TO_CART);
  const [clearCartMutation] = useMutation(CLEAR_CART);

  useEffect(() => {
    const syncCart = async () => {
      if (!user || !items.length || isSynced) return;

      try {
        for (const item of items) {
          await addToCart({
            variables: {
              productId: item.productId,
              quantity: item.quantity,
            },
          });
        }
        await clearCartMutation();
        setIsSynced(true); 
      } catch (error) {
        console.error('❌ Помилка при синхронізації корзини:', error);
      }
    };

    syncCart();
  }, [user, items, isSynced]);

  return null;
};
