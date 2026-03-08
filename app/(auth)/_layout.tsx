import { AppSettingsContext } from "@/context/AppSettings";
import { Stack } from "expo-router";
import { use } from "react";

export default function AuthLayout() {
  const { settings } = use(AppSettingsContext);

  return (
    <Stack>
      <Stack.Protected guard={!settings?.isOnboarded}>
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Protected>

      <Stack.Protected guard={settings?.isOnboarded}>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="otp-phone"
          options={{
            headerShown: false,
            presentation: "card",
            gestureEnabled: false,
            animation: "slide_from_right",
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
