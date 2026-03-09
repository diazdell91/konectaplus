import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import { SPACING } from "@/theme/spacing";

interface OtpHeaderProps {
  maskedPhone: string;
  codeLength: number;
}

const OtpHeader = ({ maskedPhone, codeLength }: OtpHeaderProps) => (
  <>
    <Animated.View entering={FadeInDown.delay(0).springify()}>
      <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={12}>
        <Ionicons name="arrow-back" size={22} color={COLORS.text.primary} />
      </Pressable>
    </Animated.View>

    <Animated.View entering={ZoomIn.delay(80).springify()} style={styles.iconWrap}>
      <View style={styles.iconCircle}>
        <Ionicons name="chatbubble-ellipses" size={32} color={COLORS.neutral.white} />
      </View>
    </Animated.View>

    <Animated.View entering={FadeInDown.delay(140).springify()} style={styles.texts}>
      <Text style={styles.title}>Verifica tu número</Text>
      <Text style={styles.subtitle}>Enviamos un código de {codeLength} dígitos a</Text>
      <Text style={styles.phone}>{maskedPhone}</Text>
    </Animated.View>
  </>
);

export default OtpHeader;

const styles = StyleSheet.create({
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
  phone: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary.main,
    letterSpacing: 1,
  },
});
