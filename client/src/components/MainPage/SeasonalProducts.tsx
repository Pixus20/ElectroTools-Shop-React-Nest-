'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_ALL_PRODUCTS } from '../../../graphql/product/getProductById';

interface Product {
  id: string;
  name: string;
  imgURL: string;
  color: string;
  price: number;
  season: string;
}

export default function SeasonalProducts() {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error.message}</p>;

  const products: Product[] = data?.products || [];
  const firstThreeProducts = products.slice(0, 3);

  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold mb-6 text-center">Сезонні товари</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {firstThreeProducts.map((product: Product) => (
          <Link 
            href={`/goods/${product.id}`}
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 text-center"
          >
            <div className="w-full h-48 mb-4">
              <img
                src={product.imgURL}
                alt={product.name}
                className="w-40 h-40 mx-auto object-cover rounded"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-1">Колір: {product.color}</p>
            <p className="text-gray-500 mb-1">Сезон: {product.season}</p>
            <p className="text-green-600 font-bold">{product.price} грн</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
