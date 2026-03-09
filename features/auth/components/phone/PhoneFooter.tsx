import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface PhoneFooterProps {
  isValid: boolean;
  loading: boolean;
  onContinue: () => void;
}

const PhoneFooter = ({ isValid, loading, onContinue }: PhoneFooterProps) => (
  <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.container}>
    <Pressable
      style={({ pressed }) => [
        styles.cta,
        (!isValid || loading) && styles.ctaDisabled,
        pressed && isValid && styles.ctaPressed,
      ]}
      onPress={onContinue}
      disabled={!isValid || loading}
      accessibilityRole="button"
      accessibilityLabel="Continuar"
    >
      {loading ? (
        <ActivityIndicator color={COLORS.neutral.white} size="small" />
      ) : (
        <>
          <Text style={styles.ctaText}>Continuar</Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.neutral.white} />
        </>
      )}
    </Pressable>

    <Text style={styles.terms}>
      Al continuar aceptas nuestros{" "}
      <Text style={styles.termsLink}>Términos de uso</Text> y{" "}
      <Text style={styles.termsLink}>Política de privacidad</Text>.
    </Text>
  </Animated.View>
);

export default PhoneFooter;

const styles = StyleSheet.create({
  container: {
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
