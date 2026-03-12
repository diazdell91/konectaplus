import { COLORS } from "@/theme/colors";
import { Stack } from "expo-router";

export default function PaymentServiceLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface.primary },
        headerTintColor: COLORS.text.primary,
        headerTitleStyle: { fontFamily: "Montserrat-SemiBold", fontSize: 17 },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="payment-methods" options={{ title: "Métodos de pago" }} />
      <Stack.Screen name="add-card" options={{ title: "Añadir tarjeta" }} />
    </Stack>
  );
}
