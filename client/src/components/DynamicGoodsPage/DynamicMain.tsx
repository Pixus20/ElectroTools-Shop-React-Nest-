// 'use client';

// import { useUserStore } from '@/store/useUserStore';
// import { useMutation } from '@apollo/client';
// import { ADD_TO_CART } from '../../../graphql/cart/getCart';
// import BasicBreadcrumbs from './Breadcrumbs';
// import CommentSkeleton from './CommentSkeleton';

// interface Props {
//   product: {
//     id: string;
//     name: string;
//     imgURL: string;
//     color: string;
//     price: number;
//     quantity: number;
//     season: string;
//   };
// }

// export default function DymanicMain({ product }: Props) {
//   const user = useUserStore((state) => state.user); 
//   const [addToCartMutation, { loading, error, data }] = useMutation(ADD_TO_CART);

//   const handleAddToCart = async () => {
//     if (!user?.id) {
//       console.warn('Користувач не авторизований. Запит не буде надіслано.');
//       return;
//     }

//     try {
//       const result = await addToCartMutation({
//         variables: {
//           productId: parseInt(product.id, 10),
//           quantity: 1,
//         },
//       });

//       console.log('✅ Додано до корзини на сервері:', result.data);
//     } catch (err) {
//       console.error('❌ Помилка при додаванні до корзини:', err);
//     }
//   };

//   return (
//     <>
//       <BasicBreadcrumbs productTitle={product.name} />
//       <div className='max-w-[1280px] mx-auto'>
//         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
//           <div className="w-full">
//             <img src={product.imgURL} alt={product.name} className="rounded-xl object-contain w-full" />
//           </div>

//           <div className="space-y-5">
//             <h1 className="text-3xl font-bold text-zinc-700">{product.name}</h1>
//             <div className="text-zinc-700"><span className="font-medium">Сезон:</span> {product.season}</div>
//             <div className="text-zinc-700"><span className="font-medium">Колір:</span> {product.color}</div>
//             <div className={product.quantity ? "text-emerald-500 font-semibold" : "text-rose-500 font-semibold"}>
//               {product.quantity ? "Є в наявності" : "Немає в наявності"}
//             </div>
//             <div className="text-4xl font-bold text-green-600">{product.price} ₴</div>
//             <button
//               disabled={!product.quantity || loading}
//               onClick={handleAddToCart}
//               className={`px-6 py-3 rounded-lg font-semibold transition
//                 ${product.quantity
//                   ? "bg-amber-300 hover:bg-amber-400 text-zinc-800"
//                   : "bg-zinc-300 text-zinc-500 cursor-not-allowed"}`}
//             >
//               {loading ? 'Додається...' : 'Купити'}
//             </button>
//             {error && <p className="text-red-500">❌ Помилка: {error.message}</p>}
//             {data && <p className="text-green-500">✅ Товар додано до корзини</p>}
//           </div>
//         </div>
//         <h1 className='text-center font-black text-2xl my-4'>Відгуки клієнтів:</h1>
//         <CommentSkeleton productId={parseInt(product.id, 10)} />
//       </div>
//     </>
//   );
// }



'use client';

import { useCartStore } from '@/store/useCartStore'; // ✅ імпорт стору корзини
import { useUserStore } from '@/store/useUserStore';
import { useMutation } from '@apollo/client';
import { ADD_TO_CART } from '../../../graphql/cart/getCart';
import BasicBreadcrumbs from './Breadcrumbs';
import CommentSkeleton from './CommentSkeleton';

interface Props {
  product: {
    id: string;
    name: string;
    imgURL: string;
    color: string;
    price: number;
    quantity: number;
    season: string;
  };
}

export default function DymanicMain({ product }: Props) {
  const user = useUserStore((state) => state.user);
  const addItem = useCartStore((state) => state.addItem); // ✅ отримуємо функцію додавання

  const [addToCartMutation, { loading, error, data }] = useMutation(ADD_TO_CART);

  const handleAddToCart = async () => {
    if (!user?.id) {
      console.warn('Користувач не авторизований. Запит не буде надіслано.');
      return;
    }

    try {
      const result = await addToCartMutation({
        variables: {
          productId: parseInt(product.id, 10),
          quantity: 1,
        },
      });

      const item = result.data.addToCart;

      // ✅ Додаємо до локального Zustand-стору
      addItem({
        id: item.id,
        productId: parseInt(product.id),
        name: product.name,
        price: product.price,
        quantity: 1,
      });

      console.log('✅ Додано до корзини на сервері та локально:', item);
    } catch (err) {
      console.error('❌ Помилка при додаванні до корзини:', err);
    }
  };

  return (
    <>
      <BasicBreadcrumbs productTitle={product.name} />
      <div className='max-w-[1280px] mx-auto'>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="w-full">
            <img
              src={product.imgURL}
              alt={product.name}
              className="rounded-xl object-contain w-full"
            />
          </div>

          <div className="space-y-5">
            <h1 className="text-3xl font-bold text-zinc-700">{product.name}</h1>
            <div className="text-zinc-700">
              <span className="font-medium">Сезон:</span> {product.season}
            </div>
            <div className="text-zinc-700">
              <span className="font-medium">Колір:</span> {product.color}
            </div>
            <div
              className={
                product.quantity
                  ? 'text-emerald-500 font-semibold'
                  : 'text-rose-500 font-semibold'
              }
            >
              {product.quantity ? 'Є в наявності' : 'Немає в наявності'}
            </div>
            <div className="text-4xl font-bold text-green-600">
              {product.price} ₴
            </div>
            <button
              disabled={!product.quantity || loading}
              onClick={handleAddToCart}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                product.quantity
                  ? 'bg-amber-300 hover:bg-amber-400 text-zinc-800'
                  : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
              }`}
            >
              {loading ? 'Додається...' : 'Купити'}
            </button>
            {error && (
              <p className="text-red-500">❌ Помилка: {error.message}</p>
            )}
            {data && <p className="text-green-500">✅ Товар додано до корзини</p>}
          </div>
        </div>

        <h1 className="text-center font-black text-2xl my-4">Відгуки клієнтів:</h1>
        <CommentSkeleton productId={parseInt(product.id, 10)} />
      </div>
    </>
  );
}
