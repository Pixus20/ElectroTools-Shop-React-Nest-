'use client';

import { useCartStore } from '@/store/useCartStore';
import { useQuery } from '@apollo/client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { GET_CART } from '../../../graphql/cart/getCart';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { data, loading, error } = useQuery(GET_CART);
  const items = useCartStore((state) => state.items);
  const setItems = useCartStore((state) => state.setItems);
  const setIsSynced = useCartStore((state) => state.setIsSynced);

  useEffect(() => {
    if (data?.cartItems) {
      const transformedItems = data.cartItems.map((item: any) => ({
        id: item.id,
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      setItems(transformedItems);
      setIsSynced(true); 
    }
  }, [data, setItems, setIsSynced]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white w-[350px] h-[100vh] relative p-4 shadow-lg overflow-y-auto flex flex-col"
            initial={{ x: 350 }}
            animate={{ x: 0 }}
            exit={{ x: 350 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Ваш кошик</h2>

            {loading ? (
              <p>Завантаження...</p>
            ) : error ? (
              <p className="text-red-500">Помилка при завантаженні кошика</p>
            ) : items.length === 0 ? (
              <p className="text-gray-500">Кошик порожній</p>
            ) : (
              <ul className="flex-1 space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="border-b pb-2">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      {item.quantity} x {item.price} грн
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href="/cart"
              className="mt-4 bg-orange-500 absolute left-[50%] translate-x-[-50%] bottom-2 hover:bg-orange-600 text-white text-center py-2 rounded transition"
              onClick={onClose}
            >
              Перейти до кошика
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
