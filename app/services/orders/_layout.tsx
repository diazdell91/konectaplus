import { COLORS } from "@/theme/colors";
import { Stack } from "expo-router";

export default function OrdersServiceLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface.primary },
        headerTintColor: COLORS.text.primary,
        headerTitleStyle: { fontFamily: "Montserrat-SemiBold", fontSize: 17 },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="my-orders" options={{ title: "Mis Pedidos" }} />
      <Stack.Screen name="[orderId]" options={{ title: "Detalle del pedido" }} />
    </Stack>
  );
}
