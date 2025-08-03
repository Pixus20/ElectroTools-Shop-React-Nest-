import { useQuery } from '@apollo/client';
import Link from 'next/link'; // 
import { useState } from 'react';
import { GET_ALL_ORDERS } from '../../../graphql/order/createOrder';

export interface Order {
  id: number;
  orderId: string;
  amount: number;
  quantity: number;
  createdAt: string;
  status: 'PAID' | 'PENDING' | 'CANCELED';
  user: {
    firstName: string;
    email: string;
  };
  product: {
    name: string;
  };
}

const OrderList = () => {
  const { data, loading, error } = useQuery(GET_ALL_ORDERS, {
    variables: {
      statuses: ['PAID', 'PENDING'],
    },
  });

  const [activeTab, setActiveTab] = useState<'PAID' | 'PENDING'>('PAID');

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error.message}</p>;

  const orders: Order[] = data.ordersByStatus;
  const paidOrders = orders.filter((order) => order.status === 'PAID');
  const pendingOrders = orders.filter((order) => order.status === 'PENDING');

  const displayedOrders = activeTab === 'PAID' ? paidOrders : pendingOrders;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Список замовлень</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('PAID')}
          className={`px-4 py-2 rounded ${
            activeTab === 'PAID'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          Оплачені замовлення ({paidOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('PENDING')}
          className={`px-4 py-2 rounded ${
            activeTab === 'PENDING'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          Неоплачені замовлення ({pendingOrders.length})
        </button>
      </div>

      {/* Table or list of orders */}
      <div className="bg-white shadow rounded p-4">
        {displayedOrders.length === 0 ? (
          <p>Немає замовлень з таким статусом.</p>
        ) : (
          displayedOrders.map((order) => (
            <div key={order.id} className="border-b py-3">
              <p className="font-semibold">Замовлення: {order.orderId}</p>
              <p>Сума: {order.amount} грн</p>
              <p>Кількість: {order.quantity}</p>
              <p>Дата: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Клієнт: {order.user.firstName} ({order.user.email})</p>
              <p>Продукт: {order.product.name}</p>
              <Link
                href={`/orderlist/${order.id}`}
                className="text-blue-600 underline text-sm mt-2 inline-block"
              >
                Переглянути деталі →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderList;
