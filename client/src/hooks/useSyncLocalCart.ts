import { useCartStore } from '@/store/useCartStore';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { ADD_TO_CART } from '../../graphql/cart/getCart';

export const useSyncLocalCart = (isAuthenticated: boolean) => {
  const { items, clearCart } = useCartStore();
  const [addToCart] = useMutation(ADD_TO_CART);

  useEffect(() => {
    const sync = async () => {
      if (!isAuthenticated || items.length === 0) return;

      for (const item of items) {
        try {
          await addToCart({
            variables: {
              productId: item.productId,
              quantity: item.quantity,
            },
          });
        } catch (err) {
          console.error('❌ Error syncing item:', item, err);
        }
      }

      clearCart(); 
    };

    sync();
  }, [isAuthenticated]);
};
