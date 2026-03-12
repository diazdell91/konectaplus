import { COLORS } from "@/theme/colors";
import { Stack } from "expo-router";

export default function WalletServiceLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface.primary },
        headerTintColor: COLORS.text.primary,
        headerTitleStyle: { fontFamily: "Montserrat-SemiBold", fontSize: 17 },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="topup" options={{ title: "Saldo" }} />
      <Stack.Screen name="topup-confirm" options={{ title: "Confirmar recarga" }} />
      <Stack.Screen name="ledger" options={{ title: "Mi Wallet" }} />
    </Stack>
  );
}
