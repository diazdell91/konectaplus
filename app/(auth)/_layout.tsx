import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Stack } from "expo-router";

export default function AuthLayout() {
  const isOnboarded = useAppSettingsStore((s) => s.isOnboarded);

  return (
    <Stack>
      <Stack.Protected guard={!isOnboarded}>
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Protected>

      <Stack.Protected guard={isOnboarded}>
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
