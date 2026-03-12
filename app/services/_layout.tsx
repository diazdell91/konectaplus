import { COLORS } from "@/theme/colors";
import { Stack } from "expo-router";

export default function ServicesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="topup" />
      <Stack.Screen name="wallet" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="orders" />
      <Stack.Screen name="profile" />
      <Stack.Screen
        name="gift-cards"
        options={{
          headerShown: true,
          title: "Tarjeta regalo",
          headerStyle: { backgroundColor: COLORS.surface.primary },
          headerTintColor: COLORS.text.primary,
          headerTitleStyle: { fontFamily: "Montserrat-SemiBold", fontSize: 17 },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
