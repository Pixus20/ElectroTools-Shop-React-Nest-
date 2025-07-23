import { useAuthStore } from '@/store/useAuthStore';
import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { ADD_TO_CART, GET_CART, REMOVE_FROM_CART } from '../../graphql/cart/getCart';

// Припустимо, що структура CartItem для non-auth:
// {
//   productId: number;
//   quantity: number;
//   product: { id: number; name: string; price: number; imgURL: string }
// }

const LOCAL_CART_KEY = 'cart';

interface CartItem {
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imgURL: string;
  };
}

export const useCart = () => {
  const { isAuthenticated } = useAuthStore();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { data, loading, error, refetch } = useQuery(GET_CART, {
    skip: !isAuthenticated, // якщо не аутентифікований – пропускаємо запит до бекенду
    fetchPolicy: 'network-only',
  });

  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);

  // завантаження даних
  useEffect(() => {
    if (isAuthenticated) {
      // при вхід у акаунт – встановлюємо дані з бекенду
      if (data && data.cartItems) {
        setCartItems(data.cartItems);
      }
    } else {
      // якщо не аутентифікований – беремо з localStorage
      const stored = localStorage.getItem(LOCAL_CART_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCartItems(parsed);
        } catch (err) {
          console.error('Помилка парсингу localStorage:', err);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    }
  }, [isAuthenticated, data]);

  // функція додавання товару в кошик
  const addToCart = useCallback(
    async (productId: number, quantity: number, productData?: CartItem['product']) => {
      if (isAuthenticated) {
        // використання мутації для користувача з акаунтом
        try {
          await addToCartMutation({ variables: { productId, quantity } });
          await refetch();
        } catch (err) {
          console.error('Помилка при додаванні в кошик:', err);
        }
      } else {
        // логіка для неаутентифікованого користувача: працюємо через localStorage
        setCartItems((prev) => {
          const index = prev.findIndex((item) => item.productId === productId);
          let updatedCart;
          if (index > -1) {
            updatedCart = [...prev];
            updatedCart[index] = {
              ...updatedCart[index],
              quantity: updatedCart[index].quantity + quantity,
            };
          } else {
            // Якщо інформація про товар не передана – треба якось її отримати, тут припустимо, що productData обов'язково переданий
            if (!productData) {
              console.error('Продуктові дані не передані для нового товару');
              return prev;
            }
            updatedCart = [
              ...prev,
              { productId, quantity, product: productData },
            ];
          }
          localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updatedCart));
          return updatedCart;
        });
      }
    },
    [isAuthenticated, addToCartMutation, refetch],
  );

  // функція видалення товару з кошика
  const removeFromCart = useCallback(
    async (productId: number) => {
      if (isAuthenticated) {
        try {
          await removeFromCartMutation({ variables: { productId } });
          await refetch();
        } catch (err) {
          console.error('Помилка при видаленні з кошика:', err);
        }
      } else {
        setCartItems((prev) => {
          const updated = prev.filter((item) => item.productId !== productId);
          localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updated));
          return updated;
        });
      }
    },
    [isAuthenticated, removeFromCartMutation, refetch],
  );

  return { cartItems, addToCart, removeFromCart, loading, error };
};
