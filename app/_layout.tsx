import { ApolloProvider } from "@/apollo/apolloProvider";
import { FONTS } from "@/constants/Fonts";
import { AppSettingsProvider } from "@/context/AppSettings";
import { AuthProvider } from "@/context/AuthProvider";
import { PhoneCountryProvider } from "@/context/PhoneCountry";
import { TopupCartProvider } from "@/context/TopupCartContext";
import { selectIsAuthenticated, selectIsHydrated, useAuthStore } from "@/store/useAuthStore";
import { BORDER_RADIUS, COLORS, FONT_FAMILIES, FONT_SIZES, SPACING } from "@/theme";
import { StripeProvider } from "@stripe/stripe-react-native";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as Haptics from "expo-haptics";
import { PressablesConfig } from "pressto";
import React from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import { Toaster } from "sonner-native";

// ─────────────────────────────────────────────
// Reanimated — supress pressto false-positive warnings
// ─────────────────────────────────────────────

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────

const STRIPE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

// ─────────────────────────────────────────────
// App content — reads auth state from store (no provider re-renders)
// ─────────────────────────────────────────────

function AppContent() {
  const [fontsLoaded] = useFonts({ ...FONTS });
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isHydrated      = useAuthStore(selectIsHydrated);

  if (!isHydrated || !fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Auth flow */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      {/* Main app */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      {/* Modals */}
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

      {/* Service routes */}
      <Stack.Screen name="services" options={{ headerShown: false }} />

      {/* Legal */}
      <Stack.Screen
        name="privacy-policy"
        options={{ headerShown: true, title: "Política de privacidad" }}
      />
    </Stack>
  );
}

// ─────────────────────────────────────────────
// Root layout — provider stack
// ─────────────────────────────────────────────

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider
        publishableKey={STRIPE_KEY}
        merchantIdentifier="merchant.com.konectaplus.app"
      >
        <ApolloProvider>
          <AuthProvider>
            <PhoneCountryProvider>
              <TopupCartProvider>
                <AppSettingsProvider>
                  <KeyboardProvider>
                    <PressablesConfig
                      globalHandlers={{ onPress: () => Haptics.selectionAsync() }}
                      config={{ minScale: 0.97 }}
                    >
                      <AppContent />
                      <AppToaster />
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

// ─────────────────────────────────────────────
// Toaster — extraído para no saturar RootLayout
// ─────────────────────────────────────────────

function AppToaster() {
  return (
    <Toaster
      position="bottom-center"
      richColors
      swipeToDismissDirection="left"
      gap={SPACING.sm}
      offset={SPACING.md}
      style={{ borderRadius: BORDER_RADIUS.lg }}
      toastOptions={{
        style: {
          backgroundColor: COLORS.surface.primary,
          borderWidth: 1,
          borderColor: COLORS.border.light,
          borderRadius: BORDER_RADIUS.lg,
          paddingHorizontal: SPACING.component.screenPadding,
          paddingVertical: SPACING.sm + 4,
          shadowColor: COLORS.neutral.black,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 6,
        },
        titleStyle: {
          fontFamily: FONT_FAMILIES.semiBold,
          fontSize: FONT_SIZES.base,
          color: COLORS.text.primary,
        },
        descriptionStyle: {
          fontFamily: FONT_FAMILIES.regular,
          fontSize: FONT_SIZES.sm + 1,
          color: COLORS.text.secondary,
        },
        success: {
          borderColor: COLORS.primary.main + "40",
          backgroundColor: COLORS.primary.tint,
        },
        error: {
          borderColor: COLORS.semantic.error + "40",
          backgroundColor: COLORS.semantic.errorTint,
        },
        warning: {
          borderColor: COLORS.semantic.warning + "40",
          backgroundColor: COLORS.semantic.warningTint,
        },
        info: {
          borderColor: COLORS.border.light,
          backgroundColor: COLORS.surface.primary,
        },
      }}
    />
  );
}
