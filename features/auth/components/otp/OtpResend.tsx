import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface OtpResendProps {
  cooldown: number;
  resending: boolean;
  onResend: () => void;
}

const OtpResend = ({ cooldown, resending, onResend }: OtpResendProps) => (
  <Animated.View entering={FadeInDown.delay(320).springify()} style={styles.container}>
    {cooldown > 0 ? (
      <Text style={styles.cooldownText}>
        Reenviar en <Text style={styles.timer}>{cooldown}s</Text>
      </Text>
    ) : (
      <Pressable onPress={onResend} disabled={resending} hitSlop={8}>
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
);

export default OtpResend;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  cooldownText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  timer: {
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
