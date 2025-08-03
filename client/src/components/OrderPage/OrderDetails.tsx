import { Order } from "./OrderList";


interface OrderDetailsProps {
  order: Order;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className="bg-white shadow rounded p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4">Інформація про замовлення</h2>
      <p><strong>Номер замовлення:</strong> {order.orderId}</p>
      <p><strong>Статус:</strong> {order.status}</p>
      <p><strong>Сума:</strong> {order.amount} грн</p>
      <p><strong>Кількість:</strong> {order.quantity}</p>
      <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <p><strong>Клієнт:</strong> {order.user.firstName} ({order.user.email})</p>
      <p><strong>Продукт:</strong> {order.product.name}</p>
          </div>
  );
};

export default OrderDetails;
