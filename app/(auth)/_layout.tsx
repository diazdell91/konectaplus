import { AppSettingsContext } from "@/context/AppSettings";
import { Stack } from "expo-router";
import { use } from "react";

export default function OnboardingLayout() {
  const { settings } = use(AppSettingsContext);

  return (
    <Stack>
      {/* Mostrar onboarding solo si NO está onboarded */}
      <Stack.Protected guard={!settings?.isOnboarded}>
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
            presentation: "card",
            gestureEnabled: false,
          }}
        />
      </Stack.Protected>

      {/* Rutas normales protegidas */}
      <Stack.Protected guard={settings?.isOnboarded}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTransparent: true,
            headerStyle: { backgroundColor: "transparent" },
            headerTintColor: "white",
            title: "",
          }}
        />

        <Stack.Screen
          name="otp-phone"
          options={{
            headerShown: false,
            presentation: "card",
            gestureEnabled: false,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
