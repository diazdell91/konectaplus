import { COLORS } from "@/theme/colors";
import { Stack } from "expo-router";

export default function TopupServiceLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface.primary },
        headerTintColor: COLORS.text.primary,
        headerTitleStyle: { fontFamily: "Montserrat-SemiBold", fontSize: 17 },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="topup-mobile" options={{ headerShown: false }} />
      <Stack.Screen name="topup-flow" options={{ title: "Recarga Celular" }} />
      <Stack.Screen
        name="topup-phone-picker"
        options={{ title: "Seleccionar contacto", presentation: "card" }}
      />
      <Stack.Screen name="topup-nauta" options={{ title: "Nauta" }} />
      <Stack.Screen name="topup-confirm" options={{ title: "Confirmar recarga" }} />
    </Stack>
  );
}
