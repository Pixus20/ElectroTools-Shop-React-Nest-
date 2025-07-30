
'use client';

import CartItemControls from '@/components/CartPage/CartItemControls';
import { CartSync } from '@/components/CartPage/CartSync';
import RelatedProducts from '@/components/CartPage/RelatedProducts';
import { useCartStore } from '@/store/useCartStore';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';
import { CLEAR_CART } from '../../../graphql/cart/getCart';

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
}

const relatedProducts: Record<number, RelatedProduct[]> = {
  1: [{ id: '4', name: 'Аксесуар 1', price: 50 }],
  2: [{ id: '5', name: 'Аксесуар 2', price: 30 }],
};

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const clearCartLocal = useCartStore((state) => state.clearCart);
  const setIsSynced = useCartStore((state) => state.setIsSynced);
  const [paid, setPaid] = useState(false);

  const [clearCartMutation] = useMutation(CLEAR_CART);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleClear = async () => {
    try {
      await clearCartMutation();
      clearCartLocal();
      setIsSynced(false);
    } catch (error) {
      console.error('❌ Помилка при очищенні корзини:', error);
    }
  };

  const handlePay = async () => {
    try {
      await clearCartMutation();
      clearCartLocal();
      setIsSynced(false);
      setPaid(true);
      alert('Оплата успішна!');
    } catch (error) {
      console.error('❌ Помилка при оплаті:', error);
      alert('Сталася помилка при оплаті');
    }
  };

  if (paid) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Дякуємо за покупку!</h1>
        <Link href="/" className="text-orange-500 hover:underline">
          Повернутися на головну
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Ваш кошик</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Кошик порожній.</p>
      ) : (
        <div className="space-y-8">
          {items.map((item) => (
            <div key={item.id} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p>
                    Кількість: {item.quantity} × {item.price} грн ={' '}
                    <b>{item.price * item.quantity} грн</b>
                  </p>
                  <CartItemControls productId={item.productId} />
                </div>
              </div>

              {relatedProducts[Number(item.id)] && (
                <RelatedProducts related={relatedProducts[Number(item.id)]} />
              )}
            </div>
          ))}

          <div className="text-right text-xl font-bold">
            Загальна сума: {totalPrice} грн
          </div>

          <button
            onClick={handleClear}
            className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-black py-2 rounded transition"
          >
            Очистити кошик
          </button>

          <button
            onClick={handlePay}
            className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded text-lg transition"
          >
            Оплатити
          </button>

          <CartSync />
        </div>
      )}
    </div>
  );
}
