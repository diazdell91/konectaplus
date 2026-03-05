import { Stack } from "expo-router";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { Toaster } from "sonner-native";

// Native imports
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ApolloProvider } from "@/apollo/apolloProvider";
import { AppSettingsProvider } from "@/context/AppSettings";
import { AuthProvider, useAuth } from "@/context/AuthProvider";
import { PhoneCountryProvider } from "@/context/PhoneCountry";
import { RechargeCartProvider } from "@/context/RechargeCartContext";
import * as Haptics from "expo-haptics";
import { PressablesConfig } from "pressto";
import { KeyboardProvider } from "react-native-keyboard-controller";

// Disable Reanimated strict mode warnings
// These warnings are triggered by the pressto library's PressableScale component
// which uses patterns that are technically correct but trigger strict mode warnings
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Disable strict mode to suppress false-positive warnings
});

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{}} />
      </Stack.Protected>
      {/* grupo de modals */}
      <Stack.Screen
        name="(modals)/country-picker"
        options={{ presentation: "pageSheet", headerShown: false }}
      />
      <Stack.Screen
        name="(modals)/topups-provider-picker"
        options={{ presentation: "pageSheet", headerShown: false }}
      />
      {/* rutas de servicios */}
      <Stack.Screen name="services" options={{ headerShown: false }} />

      {/* <Stack.Screen name="privacy-policy" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="terms-of-service"
        options={{ presentation: "modal" }}
      /> */}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider>
        <AuthProvider>
          <PhoneCountryProvider>
            <RechargeCartProvider>
              <AppSettingsProvider>
                <KeyboardProvider>
                  <PressablesConfig
                    globalHandlers={{
                      onPress: () => {
                        Haptics.selectionAsync();
                      },
                    }}
                    config={{ minScale: 0.97 }}
                  >
                    <AppContent />

                    <Toaster
                      style={{
                        backgroundColor: "black",
                        borderWidth: 1,
                        borderColor: "#FFFFFF20",
                      }}
                    />
                  </PressablesConfig>
                </KeyboardProvider>
              </AppSettingsProvider>
            </RechargeCartProvider>
          </PhoneCountryProvider>
        </AuthProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}
