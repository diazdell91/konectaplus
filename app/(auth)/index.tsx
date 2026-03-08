import { useAuth } from "@/context/AuthProvider";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { FONT_FAMILIES } from "@/theme/typography";
import { COUNTRIES, detectCountryFromPhone } from "@/utils/phoneCountry";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

// ---------------------------------------------------------------------------
// Country selector row
// ---------------------------------------------------------------------------
const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.iso === "US") ?? COUNTRIES[0];

export default function PhoneScreen() {
  const { requestOtp } = useAuth();

  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const [phoneDigits, setPhoneDigits] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<TextInput>(null);

  // Border animation on focus
  const borderAnim = useSharedValue(0);
  const borderStyle = useAnimatedStyle(() => ({
    borderColor:
      borderAnim.value === 1 ? COLORS.primary.main : COLORS.border.light,
    borderWidth: borderAnim.value === 1 ? 2 : 1.5,
  }));

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(t);
  }, []);

  // Auto-detect country as user types
  const handleChangePhone = (text: string) => {
    const digits = text.replace(/\D/g, "");
    setPhoneDigits(digits);
    setError(null);

    if (digits.length >= 7) {
      const e164 = `${selectedCountry.callingCode}${digits}`;
      const detected = detectCountryFromPhone(e164);
      if (detected && detected.iso !== selectedCountry.iso) {
        setSelectedCountry(detected);
      }
    }
  };

  // Full number in E.164
  const fullNumber = `${selectedCountry.callingCode}${phoneDigits}`;
  const isValid = phoneDigits.length >= 7 && phoneDigits.length <= 13;

  const handleContinue = async () => {
    if (!isValid || loading) return;
    setLoading(true);
    setError(null);
    try {
      await requestOtp({ phone: fullNumber, purpose: "LOGIN" });
      router.push({ pathname: "/otp-phone", params: { phone: fullNumber } });
    } catch (e: any) {
      setError(e?.message ?? "Error al enviar el código");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            entering={FadeInDown.delay(60).springify()}
            style={styles.header}
          >
            <View style={styles.logoCircle}>
              <Ionicons name="flash" size={28} color={COLORS.neutral.white} />
            </View>
            <Text style={styles.brand}>KonectaPlus</Text>
          </Animated.View>

          {/* Hero text */}
          <Animated.View
            entering={FadeInDown.delay(140).springify()}
            style={styles.hero}
          >
            <Text style={styles.heroTitle}>Bienvenido</Text>
            <Text style={styles.heroSub}>
              Ingresa tu teléfono para continuar.{"\n"}Te enviamos un código por
              SMS.
            </Text>
          </Animated.View>

          {/* Phone input card */}
          <Animated.View
            entering={FadeInDown.delay(220).springify()}
            style={styles.card}
          >
            <Text style={styles.inputLabel}>Número de teléfono</Text>

            <Animated.View style={[styles.inputRow, borderStyle]}>
              {/* Country selector */}
              <Pressable
                style={styles.countryBtn}
                onPress={() => {
                  /* TODO: country picker modal */
                }}
                hitSlop={8}
              >
                <Text style={styles.flag}>{selectedCountry.flag ?? "🌍"}</Text>
                <Text style={styles.dialCode}>
                  {selectedCountry.callingCode}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={14}
                  color={COLORS.text.secondary}
                />
              </Pressable>

              <View style={styles.dividerV} />

              <TextInput
                ref={inputRef}
                style={styles.phoneInput}
                value={phoneDigits}
                onChangeText={handleChangePhone}
                keyboardType="phone-pad"
                placeholder="000 000 0000"
                placeholderTextColor={COLORS.neutral.gray300}
                autoComplete="tel"
                returnKeyType="done"
                onSubmitEditing={handleContinue}
                onFocus={() => {
                  borderAnim.value = withTiming(1, { duration: 200 });
                }}
                onBlur={() => {
                  borderAnim.value = withTiming(0, { duration: 200 });
                }}
              />

              {isValid && (
                <Animated.View entering={FadeInUp.duration(200)}>
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={COLORS.primary.main}
                    style={{ marginRight: 14 }}
                  />
                </Animated.View>
              )}
            </Animated.View>

            {error && (
              <Animated.Text
                entering={FadeInDown.duration(200)}
                style={styles.errorText}
              >
                {error}
              </Animated.Text>
            )}

            {/* Info hint */}
            <View style={styles.hint}>
              <Ionicons
                name="shield-checkmark-outline"
                size={14}
                color={COLORS.primary.main}
              />
              <Text style={styles.hintText}>
                Solo tú recibirás este código. No lo compartas.
              </Text>
            </View>
          </Animated.View>

          {/* CTA */}
          <Animated.View
            entering={FadeInDown.delay(300).springify()}
            style={styles.ctaWrap}
          >
            <Pressable
              style={({ pressed }) => [
                styles.cta,
                (!isValid || loading) && styles.ctaDisabled,
                pressed && isValid && styles.ctaPressed,
              ]}
              onPress={handleContinue}
              disabled={!isValid || loading}
              accessibilityRole="button"
              accessibilityLabel="Continuar"
            >
              {loading ? (
                <ActivityIndicator color={COLORS.neutral.white} size="small" />
              ) : (
                <>
                  <Text style={styles.ctaText}>Continuar</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={COLORS.neutral.white}
                  />
                </>
              )}
            </Pressable>

            <Text style={styles.terms}>
              Al continuar aceptas nuestros{" "}
              <Text style={styles.termsLink}>Términos de uso</Text> y{" "}
              <Text style={styles.termsLink}>Política de privacidad</Text>.
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  kav: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.component.screenPadding,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    gap: SPACING.xl,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primary.main,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text.primary,
  },

  // Hero
  hero: {
    gap: SPACING.xs,
    paddingTop: SPACING.md,
  },
  heroTitle: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.text.primary,
    lineHeight: 38,
  },
  heroSub: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 16,
    color: COLORS.text.secondary,
    lineHeight: 24,
  },

  // Card
  card: {
    gap: SPACING.sm,
  },
  inputLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: 2,
  },

  // Input row
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border.light,
    overflow: "hidden",
    minHeight: 58,
  },
  countryBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 6,
  },
  flag: {
    fontSize: 20,
    lineHeight: 24,
  },
  dialCode: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  dividerV: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.border.light,
  },
  phoneInput: {
    flex: 1,
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.text.primary,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  // Error
  errorText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.semantic.error,
    marginTop: 2,
    marginLeft: 4,
  },

  // Hint
  hint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EAF7F5",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  hintText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.primary.main,
    flex: 1,
    lineHeight: 17,
  },

  // CTA
  ctaWrap: {
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
  cta: {
    backgroundColor: COLORS.primary.main,
    borderRadius: 16,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  ctaDisabled: {
    backgroundColor: COLORS.neutral.gray200,
  },
  ctaPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  ctaText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.neutral.white,
  },

  // Terms
  terms: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    fontFamily: FONT_FAMILIES.semiBold,
    color: COLORS.primary.main,
  },
});
