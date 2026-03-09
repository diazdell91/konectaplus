import OTPInput from "../components/otp/OTPInput";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
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
  ZoomIn,
} from "react-native-reanimated";
import OtpHeader from "../components/otp/OtpHeader";
import OtpResend from "../components/otp/OtpResend";
import { useOtpVerification } from "../hooks/useOtpVerification";

const OtpPhoneScreen = () => {
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const {
    code,
    loading,
    resending,
    cooldown,
    error,
    success,
    shake,
    maskedPhone,
    codeLength,
    handleCodeChange,
    handleVerify,
    handleResend,
  } = useOtpVerification(phone);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <OtpHeader maskedPhone={maskedPhone} codeLength={codeLength} />

          {/* OTP input */}
          <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.otpWrap}>
            <Animated.View style={shakeStyle}>
              <OTPInput
                length={codeLength}
                value={code}
                onChangeText={handleCodeChange}
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
              <Animated.View entering={ZoomIn.springify()} style={styles.successRow}>
                <Ionicons name="checkmark-circle" size={18} color={COLORS.primary.main} />
                <Text style={styles.successText}>¡Verificado!</Text>
              </Animated.View>
            )}
          </Animated.View>

          {/* CTA */}
          {!success && (
            <Animated.View entering={FadeInDown.delay(260).springify()} style={styles.ctaWrap}>
              <Pressable
                style={({ pressed }) => [
                  styles.cta,
                  (code.length < codeLength || loading) && styles.ctaDisabled,
                  pressed && code.length === codeLength && !loading && styles.ctaPressed,
                ]}
                onPress={() => handleVerify(code)}
                disabled={code.length < codeLength || loading}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.neutral.white} size="small" />
                ) : (
                  <>
                    <Text style={styles.ctaText}>Verificar</Text>
                    <Ionicons name="arrow-forward" size={20} color={COLORS.neutral.white} />
                  </>
                )}
              </Pressable>
            </Animated.View>
          )}

          <OtpResend cooldown={cooldown} resending={resending} onResend={handleResend} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpPhoneScreen;

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
});
