import OTPInput from "@/components/otp/OTPInput";
import { useAuth } from "@/context/AuthProvider";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  ZoomIn,
} from "react-native-reanimated";

const RESEND_SECONDS = 60;
const CODE_LENGTH = 6;

function maskPhone(phone: string): string {
  if (!phone) return "";
  const clean = phone.replace(/\s/g, "");
  if (clean.length <= 4) return clean;
  const visible = clean.slice(-2);
  const prefix = clean.slice(0, Math.min(5, clean.length - 4));
  return `${prefix} ···· ··${visible}`;
}

export default function OtpPhoneScreen() {
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const { verifyOtp, requestOtp } = useAuth();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  useEffect(() => {
    if (code.length === CODE_LENGTH && !loading && !success) {
      handleVerify(code);
    }
  }, [code]);

  const shake = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  const triggerShake = () => {
    shake.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withRepeat(
        withSequence(
          withTiming(10, { duration: 50 }),
          withTiming(-10, { duration: 50 }),
        ),
        3,
        false,
      ),
      withTiming(0, { duration: 50 }),
    );
  };

  const handleVerify = async (currentCode: string) => {
    if (loading || !phone || currentCode.length < CODE_LENGTH) return;
    setLoading(true);
    setError(null);
    try {
      await verifyOtp({
        phone,
        code: currentCode,
        device: {
          deviceName: Platform.OS === "ios" ? "iPhone" : "Android",
          deviceId: "MOBILE",
        },
      });
      setSuccess(true);
      // Root layout redirects automatically on auth state change
    } catch (e: any) {
      setError(e?.message ?? "Código incorrecto. Intenta de nuevo.");
      setCode("");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!phone || resending || cooldown > 0) return;
    setResending(true);
    setError(null);
    setCode("");
    try {
      await requestOtp({ phone, purpose: "LOGIN" });
      setCooldown(RESEND_SECONDS);
    } catch (e: any) {
      setError(e?.message ?? "No se pudo reenviar el código");
    } finally {
      setResending(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          {/* Back */}
          <Animated.View entering={FadeInDown.delay(0).springify()}>
            <Pressable
              style={styles.backBtn}
              onPress={() => router.back()}
              hitSlop={12}
            >
              <Ionicons name="arrow-back" size={22} color={COLORS.text.primary} />
            </Pressable>
          </Animated.View>

          {/* Icon */}
          <Animated.View
            entering={ZoomIn.delay(80).springify()}
            style={styles.iconWrap}
          >
            <View style={styles.iconCircle}>
              <Ionicons
                name="chatbubble-ellipses"
                size={32}
                color={COLORS.neutral.white}
              />
            </View>
          </Animated.View>

          {/* Texts */}
          <Animated.View
            entering={FadeInDown.delay(140).springify()}
            style={styles.texts}
          >
            <Text style={styles.title}>Verifica tu número</Text>
            <Text style={styles.subtitle}>
              Enviamos un código de {CODE_LENGTH} dígitos a
            </Text>
            <Text style={styles.phoneDisplay}>{maskPhone(phone ?? "")}</Text>
          </Animated.View>

          {/* OTP */}
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            style={styles.otpWrap}
          >
            <Animated.View style={shakeStyle}>
              <OTPInput
                length={CODE_LENGTH}
                value={code}
                onChangeText={(val) => {
                  setCode(val);
                  if (error) setError(null);
                }}
                autoFocus
                hasError={!!error}
                disabled={loading || success}
              />
            </Animated.View>

            {error && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(150)}
                style={styles.errorText}
              >
                {error}
              </Animated.Text>
            )}

            {success && (
              <Animated.View
                entering={ZoomIn.springify()}
                style={styles.successRow}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={COLORS.primary.main}
                />
                <Text style={styles.successText}>¡Verificado!</Text>
              </Animated.View>
            )}
          </Animated.View>

          {/* CTA */}
          {!success && (
            <Animated.View
              entering={FadeInDown.delay(260).springify()}
              style={styles.ctaWrap}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.cta,
                  (code.length < CODE_LENGTH || loading) && styles.ctaDisabled,
                  pressed &&
                    code.length === CODE_LENGTH &&
                    !loading &&
                    styles.ctaPressed,
                ]}
                onPress={() => handleVerify(code)}
                disabled={code.length < CODE_LENGTH || loading}
              >
                {loading ? (
                  <ActivityIndicator
                    color={COLORS.neutral.white}
                    size="small"
                  />
                ) : (
                  <>
                    <Text style={styles.ctaText}>Verificar</Text>
                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color={COLORS.neutral.white}
                    />
                  </>
                )}
              </Pressable>
            </Animated.View>
          )}

          {/* Resend */}
          <Animated.View
            entering={FadeInDown.delay(320).springify()}
            style={styles.resendWrap}
          >
            {cooldown > 0 ? (
              <Text style={styles.resendCooldown}>
                Reenviar en{" "}
                <Text style={styles.resendTimer}>{cooldown}s</Text>
              </Text>
            ) : (
              <Pressable
                onPress={handleResend}
                disabled={resending}
                hitSlop={8}
              >
                {resending ? (
                  <ActivityIndicator size="small" color={COLORS.primary.main} />
                ) : (
                  <Text style={styles.resendLink}>
                    ¿No recibiste el código?{" "}
                    <Text style={styles.resendAction}>Reenviar</Text>
                  </Text>
                )}
              </Pressable>
            )}
          </Animated.View>
        </View>
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
  container: {
    flex: 1,
    paddingHorizontal: SPACING.component.screenPadding,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xxxl,
    gap: SPACING.lg,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.neutral.gray100,
    alignItems: "center",
    justifyContent: "center",
  },

  iconWrap: {
    alignItems: "flex-start",
    marginTop: SPACING.md,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.primary.main,
    alignItems: "center",
    justifyContent: "center",
  },

  texts: {
    gap: 6,
  },
  title: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text.primary,
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 16,
    color: COLORS.text.secondary,
    lineHeight: 22,
  },
  phoneDisplay: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary.main,
    letterSpacing: 1,
  },

  otpWrap: {
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  errorText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.semantic.error,
    textAlign: "center",
    marginTop: 4,
  },
  successRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 4,
  },
  successText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary.main,
  },

  ctaWrap: {
    marginTop: SPACING.xs,
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

  resendWrap: {
    alignItems: "center",
  },
  resendCooldown: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  resendTimer: {
    fontFamily: FONT_FAMILIES.bold,
    color: COLORS.primary.main,
  },
  resendLink: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
  resendAction: {
    fontFamily: FONT_FAMILIES.semiBold,
    color: COLORS.primary.main,
  },
});
