// 'use client';
// import { useCartStore } from '@/store/useCartStore';
// import Link from 'next/link';
// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { CREATE_ORDER } from '../../../graphql/order/createOrder';


// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// const relatedProducts = {
//   '1': [{ id: '4', name: 'Аксесуар 1', price: 50 }],
//   '2': [{ id: '5', name: 'Аксесуар 2', price: 30 }],
// };

// export default function CartPage() {
//   const items = useCartStore((state) => state.items);
//   const removeItem = useCartStore((state) => state.removeItem);

//   const [paid, setPaid] = useState(false);

//   const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handlePay = () => {
//     // Тут могла б бути логіка оплати, але для прикладу просто підтверджуємо
//     alert('Оплата успішна!');
//     setPaid(true);
//   };

//   if (paid) {
//     return (
//       <div className="max-w-3xl mx-auto p-6 text-center">
//         <h1 className="text-3xl font-bold mb-4">Дякуємо за покупку!</h1>
//         <Link href="/" className="text-orange-500 hover:underline">
//           Повернутися на головну
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-4xl font-bold mb-8">Ваш кошик</h1>

//       {items.length === 0 ? (
//         <p className="text-gray-600">Кошик порожній.</p>
//       ) : (
//         <div className="space-y-8">
//           {items.map((item) => (
//             <div key={item.id} className="border-b pb-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h2 className="text-xl font-semibold">{item.name}</h2>
//                   <p>
//                     Кількість: {item.quantity} × {item.price} грн ={' '}
//                     <b>{item.price * item.quantity} грн</b>
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="text-red-500 hover:underline"
//                 >
//                   Видалити
//                 </button>
//               </div>

//               {relatedProducts[item.id] && relatedProducts[item.id].length > 0 && (
//                 <div className="mt-3">
//                   <h3 className="font-semibold text-orange-600 mb-2">Часто купують разом:</h3>
//                   <ul className="flex gap-4">
//                     {relatedProducts[item.id].map((rel) => (
//                       <li key={rel.id} className="border rounded p-2 w-40">
//                         <p>{rel.name}</p>
//                         <p className="text-sm text-gray-700">{rel.price} грн</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}

//           <div className="text-right text-xl font-bold">
//             Загальна сума: {totalPrice} грн
//           </div>

//           <button
//             onClick={handlePay}
//             className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded text-lg transition"
//           >
//             Оплатити
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import CartItemControls from '@/components/CartPage/CartItemControls';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { useState } from 'react';

const relatedProducts = {
  '1': [{ id: '4', name: 'Аксесуар 1', price: 50 }],
  '2': [{ id: '5', name: 'Аксесуар 2', price: 30 }],
};

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [paid, setPaid] = useState(false);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePay = () => {
    alert('Оплата успішна!');
    setPaid(true);
    clearCart();
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

              {relatedProducts[item.id] && relatedProducts[item.id].length > 0 && (
                <div className="mt-3">
                  <h3 className="font-semibold text-orange-600 mb-2">Часто купують разом:</h3>
                  <ul className="flex gap-4">
                    {relatedProducts[item.id].map((rel) => (
                      <li key={rel.id} className="border rounded p-2 w-40">
                        <p>{rel.name}</p>
                        <p className="text-sm text-gray-700">{rel.price} грн</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <div className="text-right text-xl font-bold">
            Загальна сума: {totalPrice} грн
          </div>

          <button
            onClick={clearCart}
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
        </div>
      )}
    </div>
  );
}
