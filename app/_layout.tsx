import { Stack } from "expo-router";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { Toaster } from "sonner-native";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";

// Native imports
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ApolloProvider } from "@/apollo/apolloProvider";
import { AppSettingsProvider } from "@/context/AppSettings";
import { AuthProvider, useAuth } from "@/context/AuthProvider";
import { PhoneCountryProvider } from "@/context/PhoneCountry";
import { TopupCartProvider } from "@/context/TopupCartContext";
import * as Haptics from "expo-haptics";
import { PressablesConfig } from "pressto";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { StripeProvider } from "@stripe/stripe-react-native";

const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

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
        name="(modals)/topup-provider-picker"
        options={{ presentation: "pageSheet", headerShown: false }}
      />
      <Stack.Screen
        name="(modals)/payment-method-picker"
        options={{ presentation: "pageSheet", headerShown: false }}
      />
      {/* rutas de servicios */}
      <Stack.Screen name="services" options={{ headerShown: false }} />

      <Stack.Screen
        name="privacy-policy"
        options={{ headerShown: true, title: "Política de privacidad" }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <ApolloProvider>
        <AuthProvider>
          <PhoneCountryProvider>
            <TopupCartProvider>
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
                      position="bottom-center"
                      richColors
                      swipeToDismissDirection="left"
                      gap={8}
                      offset={16}
                      style={{
                        borderRadius: 14,
                      }}
                      toastOptions={{
                        style: {
                          backgroundColor: COLORS.surface.primary,
                          borderWidth: 1,
                          borderColor: COLORS.border.light,
                          borderRadius: 14,
                          paddingHorizontal: 14,
                          paddingVertical: 12,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.08,
                          shadowRadius: 12,
                          elevation: 6,
                        },
                        titleStyle: {
                          fontFamily: FONT_FAMILIES.semiBold,
                          fontSize: 14,
                          color: COLORS.text.primary,
                        },
                        descriptionStyle: {
                          fontFamily: FONT_FAMILIES.regular,
                          fontSize: 13,
                          color: COLORS.text.secondary,
                        },
                        success: {
                          borderColor: COLORS.primary.main + "40",
                          backgroundColor: "#EAF7F5",
                        },
                        error: {
                          borderColor: COLORS.semantic.error + "40",
                          backgroundColor: "#FEF2F2",
                        },
                        warning: {
                          borderColor: "#F59E0B40",
                          backgroundColor: "#FFFBEB",
                        },
                        info: {
                          borderColor: COLORS.border.light,
                          backgroundColor: COLORS.surface.primary,
                        },
                      }}
                    />
                  </PressablesConfig>
                </KeyboardProvider>
              </AppSettingsProvider>
            </TopupCartProvider>
          </PhoneCountryProvider>
        </AuthProvider>
      </ApolloProvider>
      </StripeProvider>
    </GestureHandlerRootView>
  );
}
