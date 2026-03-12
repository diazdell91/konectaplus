import { COLORS } from "@/theme/colors";
import { Stack } from "expo-router";

export default function ProfileServiceLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface.primary },
        headerTintColor: COLORS.text.primary,
        headerTitleStyle: { fontFamily: "Montserrat-SemiBold", fontSize: 17 },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="basic-info" options={{ title: "Información básica" }} />
      <Stack.Screen name="addresses" options={{ title: "Mis Direcciones" }} />
      <Stack.Screen name="recipients" options={{ title: "Mis Beneficiarios" }} />
      <Stack.Screen name="notifications" options={{ title: "Notificaciones" }} />
      <Stack.Screen name="change-password" options={{ title: "Cambiar contraseña" }} />
      <Stack.Screen name="sessions" options={{ title: "Sesiones activas" }} />
      <Stack.Screen name="help-center" options={{ title: "Ayuda" }} />
    </Stack>
  );
}
