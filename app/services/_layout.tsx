import { COLORS } from "@/theme/colors";
import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: false,
        headerStyle: { backgroundColor: COLORS.surface.primary },
        headerTintColor: COLORS.text.primary,
        headerTitleStyle: {
          fontFamily: "Montserrat-SemiBold",
          fontSize: 17,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="topup/topup-mobile"
        options={{ title: "Recarga Celular", headerShown: false }}
      />
      <Stack.Screen
        name="topup/topup-flow"
        options={{ title: "Recarga Celular" }}
      />
      <Stack.Screen
        name="topup/topup-phone-picker"
        options={{
          title: "Seleccionar contacto",
          presentation: "card",
        }}
      />
      <Stack.Screen name="topup/topup-nauta" options={{ title: "Nauta" }} />
      <Stack.Screen
        name="topup/topup-confirm"
        options={{ title: "Confirmar recarga" }}
      />
      <Stack.Screen name="wallet/topup" options={{ title: "Saldo" }} />
      <Stack.Screen name="wallet/ledger" options={{ title: "Mi Wallet" }} />
      <Stack.Screen
        name="wallet/topup-confirm"
        options={{ title: "Confirmar recarga" }}
      />
      <Stack.Screen
        name="payment/payment-methods"
        options={{ title: "Métodos de pago" }}
      />
      <Stack.Screen
        name="payment/add-card"
        options={{ title: "Añadir tarjeta" }}
      />
      <Stack.Screen name="gift-cards" options={{ title: "Tarjeta regalo" }} />
      <Stack.Screen name="orders/my-orders" options={{ title: "Mis Pedidos" }} />
      <Stack.Screen name="orders/[orderId]" options={{ title: "Detalle del pedido" }} />
    </Stack>
  );
}
