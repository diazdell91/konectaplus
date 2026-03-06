import OrderDetailScreen from "@/components/orders/OrderDetailScreen";
import { useLocalSearchParams } from "expo-router";

export default function OrderDetailRoute() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  return <OrderDetailScreen orderId={orderId} />;
}
