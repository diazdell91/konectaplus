import { Stack } from "expo-router";

export default function TopupLayout() {
  return (
    <Stack>
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
        name="recharge-flow"
        options={{
          headerShown: false,
          presentation: "pageSheet",
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
