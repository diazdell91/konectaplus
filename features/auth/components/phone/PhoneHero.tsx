import { Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const PhoneHero = () => (
  <Animated.View
    entering={FadeInDown.delay(140).springify()}
    style={styles.container}
  >
    <Text style={styles.title}>Bienvenido</Text>
    <Text style={styles.subtitle}>
      Ingresa tu teléfono para continuar.{"\n"}Te enviamos un código por SMS.
    </Text>
  </Animated.View>
);

export default PhoneHero;

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xs,
    paddingTop: SPACING.md,
  },
  title: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.text.primary,
    lineHeight: 38,
  },
  subtitle: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 16,
    color: COLORS.text.secondary,
    lineHeight: 24,
  },
});
