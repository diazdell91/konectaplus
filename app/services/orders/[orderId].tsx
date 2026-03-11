import OrderDetailScreen from "@/features/orders/screens/OrderDetailScreen";
import { useLocalSearchParams } from "expo-router";

const OrderDetailPage = () => {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  return <OrderDetailScreen orderId={orderId} />;
};

export default OrderDetailPage;
