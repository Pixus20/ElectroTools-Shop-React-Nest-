import OrderDetails from "@/components/OrderPage/OrderDetails";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_ORDER_BY_ID } from "../../../../graphql/order/createOrder";

const OrderPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_ORDER_BY_ID, {
    skip: !id,
    variables: { id: Number(id) },
  });

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error.message}</p>;
  if (!data?.order) return <p>Замовлення не знайдено</p>;

  return (
    <div className="p-6">
      <OrderDetails order={data.order} />
    </div>
  );
};

export default OrderPage;
