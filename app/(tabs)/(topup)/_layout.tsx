import { Stack } from "expo-router";

export default function TopupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
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
    </Stack>
  );
}
