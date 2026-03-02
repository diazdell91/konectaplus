import { COLORS } from "@/theme";
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

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "success";
type ButtonSize = "sm" | "md" | "lg";

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
  fontStyle?: {
    color?: string;
    fontSize?: number;
    fontWeight?: TextStyle["fontWeight"];
  };
};

const DISABLED_BG = "#E5E7EB";
const DISABLED_TEXT = "#9CA3AF";

function getHeights(size: ButtonSize) {
  switch (size) {
    case "sm":
      return { height: 36, paddingHorizontal: 14, fontSize: 14, iconSize: 18 };
    case "lg":
      return { height: 56, paddingHorizontal: 18, fontSize: 18, iconSize: 22 };
    case "md":
      return { height: 48, paddingHorizontal: 16, fontSize: 16, iconSize: 20 };
    default:
      return { height: 56, paddingHorizontal: 18, fontSize: 18, iconSize: 22 };
  }
}

function getBgColor(variant: ButtonVariant, disabled?: boolean) {
  if (disabled) return DISABLED_BG;

  switch (variant) {
    case "primary":
      return COLORS.primary.main;
    case "success":
      return COLORS.primary.light;
    case "secondary":
      return COLORS.neutral.white;
    case "outline":
    case "ghost":
      return "transparent";
    default:
      return COLORS.primary.main;
  }
}

function getBorder(variant: ButtonVariant, disabled?: boolean) {
  if (disabled) return { borderWidth: 0, borderColor: "transparent" };

  switch (variant) {
    case "secondary":
    case "outline":
      return { borderWidth: 1, borderColor: COLORS.light.border };
    default:
      return { borderWidth: 0, borderColor: "transparent" };
  }
}

function getTextColor(
  variant: ButtonVariant,
  disabled?: boolean,
  override?: string,
) {
  if (override) return override;
  if (disabled) return DISABLED_TEXT;

  switch (variant) {
    case "secondary":
    case "outline":
    case "ghost":
      return COLORS.primary.main;
    default:
      return COLORS.neutral.white;
  }
}

export function Button(props: ButtonProps) {
  const {
    style,
    title,
    loading,
    disabled,
    icon,
    variant = "primary",
    size = "lg",
    fullWidth = true,
    onPress,
    fontStyle,
    accessibilityRole,
    accessibilityLabel,
  } = props;

  const isDisabled = !!disabled || !!loading;
  const { height, paddingHorizontal, fontSize, iconSize } = getHeights(size);

  const backgroundColor = getBgColor(variant, isDisabled);
  const { borderWidth, borderColor } = getBorder(variant, isDisabled);
  const textColor = getTextColor(variant, isDisabled, fontStyle?.color);

  const containerStyle: ViewStyle = {
    alignSelf: fullWidth ? "stretch" : "center",
    marginHorizontal: fullWidth ? 18 : 0,
  };

  const buttonStyle: ViewStyle = {
    height,
    paddingHorizontal,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
    backgroundColor,
    borderWidth,
    borderColor,
    opacity: isDisabled ? 0.9 : 1,
  };

  const labelStyle: TextStyle = {
    fontSize: fontStyle?.fontSize ?? fontSize,
    fontWeight: fontStyle?.fontWeight ?? "600",
    color: textColor,
  };

  // ✅ Reanimated: scale press effect
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (isDisabled) return;
    scale.value = withSpring(0.96, {
      damping: 18,
      stiffness: 260,
      mass: 0.35,
    });
  };

  const handlePressOut = () => {
    if (isDisabled) return;
    scale.value = withTiming(1, { duration: 120 });
  };

  return (
    <View style={[containerStyle, style as any]}>
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={isDisabled ? undefined : onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          accessibilityRole={(accessibilityRole as any) ?? "button"}
          accessibilityLabel={accessibilityLabel || title}
          style={({ pressed }) => [
            buttonStyle,
            !isDisabled && pressed ? { opacity: 0.85 } : null,
          ]}
        >
          {loading ? (
            <ActivityIndicator color={textColor} />
          ) : icon ? (
            <Icon name={icon} size={iconSize} color={textColor} />
          ) : null}

          {!!title && <Text style={labelStyle}>{title}</Text>}
        </Pressable>
      </Animated.View>
    </View>
  );
}

export default Button;
