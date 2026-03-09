import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import React, { ReactNode } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export interface PaymentMethodButtonProps {
  title: string;
  icon: ReactNode;
  rightIcon?: ReactNode;
  onPress?: () => void;
}

const PaymentMethodButton = ({
  title,
  icon,
  rightIcon,
  onPress,
}: PaymentMethodButtonProps) => (
  <Pressable
    onPress={onPress}
    android_ripple={{ color: COLORS.neutral.gray100, borderless: false }}
    style={({ pressed }) => [
      styles.button,
      pressed && Platform.OS === "ios" && styles.buttonPressed,
    ]}
  >
    <View style={styles.iconWrap}>{icon}</View>
    <Text style={styles.label} numberOfLines={1}>
      {title}
    </Text>
    {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}
  </Pressable>
);

export default PaymentMethodButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.background.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  label: {
    flex: 1,
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
