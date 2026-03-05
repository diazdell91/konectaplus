import { COLORS } from "@/theme/colors";
import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
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
        name="recharge/mobile"
        options={{ title: "Recarga Celular", headerShown: false }}
      />
      <Stack.Screen
        name="recharge/recharge-flow"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="recharge/phone-picker"
        options={{
          title: "Seleccionar contacto",
          presentation: "card",
        }}
      />
      <Stack.Screen name="recharge/nauta" options={{ title: "Nauta" }} />
      <Stack.Screen name="wallet/topup" options={{ title: "Saldo" }} />
      <Stack.Screen name="gift-cards" options={{ title: "Tarjeta regalo" }} />
    </Stack>
  );
}
