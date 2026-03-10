import { BORDER_RADIUS, COLORS, COMPONENT_SIZES, FONT_FAMILIES, FONT_SIZES } from "@/theme";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "success";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonPropsParams = {
  title?: string;
  loading?: boolean;
  icon?: React.ComponentProps<typeof Icon>["name"];
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  accessibilityRole?: string;
  accessibilityLabel?: string;
};

export type ButtonProps = ButtonPropsParams & {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

// ─────────────────────────────────────────────
// Theme tokens
// ─────────────────────────────────────────────

const SIZE_MAP: Record<ButtonSize, { height: number; paddingHorizontal: number; fontSize: number; iconSize: number }> = {
  sm: { height: COMPONENT_SIZES.button.heightSm, paddingHorizontal: 14, fontSize: FONT_SIZES.base, iconSize: 18 },
  md: { height: COMPONENT_SIZES.button.height,   paddingHorizontal: 16, fontSize: FONT_SIZES.md,   iconSize: 20 },
  lg: { height: COMPONENT_SIZES.button.height,   paddingHorizontal: 18, fontSize: FONT_SIZES.lg,   iconSize: 22 },
};

const VARIANT_BG: Record<ButtonVariant, string> = {
  primary:   COLORS.primary.main,
  success:   COLORS.primary.dark,
  secondary: COLORS.neutral.white,
  outline:   "transparent",
  ghost:     "transparent",
};

const VARIANT_TEXT: Record<ButtonVariant, string> = {
  primary:   COLORS.text.inverse,
  success:   COLORS.text.inverse,
  secondary: COLORS.primary.main,
  outline:   COLORS.primary.main,
  ghost:     COLORS.primary.main,
};

const VARIANT_BORDER: Record<ButtonVariant, { borderWidth: number; borderColor: string }> = {
  primary:   { borderWidth: 0, borderColor: "transparent" },
  success:   { borderWidth: 0, borderColor: "transparent" },
  secondary: { borderWidth: 1, borderColor: COLORS.border.light },
  outline:   { borderWidth: 1, borderColor: COLORS.border.medium },
  ghost:     { borderWidth: 0, borderColor: "transparent" },
};

const DISABLED_BG   = COLORS.neutral.gray200;
const DISABLED_TEXT = COLORS.neutral.gray400;

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function Button({
  style,
  textStyle,
  title,
  loading,
  disabled,
  icon,
  variant = "primary",
  size = "lg",
  fullWidth = true,
  onPress,
  accessibilityRole,
  accessibilityLabel,
}: ButtonProps) {
  const isDisabled = !!disabled || !!loading;
  const { height, paddingHorizontal, fontSize, iconSize } = SIZE_MAP[size];

  const backgroundColor = isDisabled ? DISABLED_BG : VARIANT_BG[variant];
  const textColor       = isDisabled ? DISABLED_TEXT : VARIANT_TEXT[variant];
  const { borderWidth, borderColor } = isDisabled
    ? { borderWidth: 0, borderColor: "transparent" }
    : VARIANT_BORDER[variant];

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (isDisabled) return;
    scale.value = withSpring(0.96, { damping: 18, stiffness: 260, mass: 0.35 });
  };

  const handlePressOut = () => {
    if (isDisabled) return;
    scale.value = withTiming(1, { duration: 120 });
  };

  const containerStyle: ViewStyle = {
    alignSelf: fullWidth ? "stretch" : "center",
    marginHorizontal: fullWidth ? 18 : 0,
  };

  const buttonStyle: ViewStyle = {
    height,
    paddingHorizontal,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    backgroundColor,
    borderWidth,
    borderColor,
    opacity: isDisabled ? 0.6 : 1,
  };

  const labelStyle: TextStyle = {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize,
    fontWeight: "600",
    color: textColor,
  };

  return (
    <View style={[containerStyle, style as ViewStyle]}>
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={isDisabled ? undefined : onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          accessibilityRole={(accessibilityRole as any) ?? "button"}
          accessibilityLabel={accessibilityLabel ?? title}
          style={({ pressed }) => [
            buttonStyle,
            !isDisabled && pressed && { opacity: 0.85 },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={textColor} size="small" />
          ) : icon ? (
            <Icon name={icon} size={iconSize} color={textColor} />
          ) : null}

          {!!title && <Text style={[labelStyle, textStyle]}>{title}</Text>}
        </Pressable>
      </Animated.View>
    </View>
  );
}

export default Button;
