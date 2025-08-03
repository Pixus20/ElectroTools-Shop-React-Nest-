import { Order } from "./OrderList";

const OrderDetails = ({ order }: { order: Order }) => {
  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Деталі замовлення</h2>
      <p><strong>ID замовлення:</strong> {order.orderId}</p>
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
