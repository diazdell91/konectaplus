import {
  BORDER_RADIUS,
  COLORS,
  COMPONENT_SIZES,
  FONT_FAMILIES,
  FONT_SIZES,
  SPACING,
} from "@/theme";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from "react-native";
import Text from "./Text";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type InputSize = "sm" | "md" | "lg";

type InputOwnProps = {
  label?: string;
  helperText?: string;
  error?: string;
  size?: InputSize;
  iconLeft?: React.ComponentProps<typeof Icon>["name"];
  iconRight?: React.ComponentProps<typeof Icon>["name"];
  onPressRight?: () => void;
  onLeftIconPress?: () => void;
  showPasswordToggle?: boolean;
};

export type InputProps = InputOwnProps & RNTextInputProps;

// ─────────────────────────────────────────────
// Size tokens
// ─────────────────────────────────────────────

const SIZE_HEIGHT: Record<InputSize, number> = {
  sm: 44,
  md: COMPONENT_SIZES.input.heightSm,
  lg: COMPONENT_SIZES.input.height,
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const Input = forwardRef<RNTextInput, InputProps>((props, ref) => {
  const {
    style,
    label,
    iconLeft,
    iconRight,
    onPressRight,
    onLeftIconPress,
    helperText,
    error,
    editable = true,
    size = "md",
    secureTextEntry = false,
    showPasswordToggle = false,
    ...rest
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const innerRef = useRef<RNTextInput>(null);

  useImperativeHandle(ref, () => innerRef.current as RNTextInput);

  const isPassword = secureTextEntry || showPasswordToggle;
  const showToggle = isPassword && showPasswordToggle;

  const rightIconName: React.ComponentProps<typeof Icon>["name"] | undefined =
    showToggle ? (isPasswordVisible ? "eye-off" : "eye") : iconRight;

  const handleRightPress = showToggle
    ? () => setIsPasswordVisible((v) => !v)
    : onPressRight;

  const hasError = !!error;
  const height = SIZE_HEIGHT[size];

  const containerBorderColor = hasError
    ? COLORS.border.error
    : COLORS.border.light;

  return (
    <View style={styles.wrapper}>
      {!!label && (
        <Text label style={styles.label}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          { height, borderColor: containerBorderColor },
          !editable && styles.inputDisabled,
          style,
        ]}
      >
        {iconLeft && (
          <Pressable
            onPress={onLeftIconPress}
            style={styles.iconWrap}
            hitSlop={8}
          >
            <Icon
              name={iconLeft}
              size={COMPONENT_SIZES.icon.sm}
              color={COLORS.neutral.gray400}
            />
          </Pressable>
        )}

        <RNTextInput
          ref={innerRef}
          style={[
            styles.input,
            iconLeft && styles.inputWithLeftIcon,
            rightIconName && styles.inputWithRightIcon,
          ]}
          placeholderTextColor={COLORS.neutral.gray400}
          editable={editable}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...rest}
        />

        {rightIconName && (
          <Pressable
            onPress={handleRightPress}
            style={styles.iconWrap}
            hitSlop={8}
          >
            <Icon
              name={rightIconName}
              size={COMPONENT_SIZES.icon.sm}
              color={COLORS.neutral.gray400}
            />
          </Pressable>
        )}
      </View>

      {hasError && (
        <Text small style={styles.errorText}>
          {error}
        </Text>
      )}
      {!!helperText && !hasError && (
        <Text small style={styles.helperText}>
          {helperText}
        </Text>
      )}
    </View>
  );
});

Input.displayName = "Input";

export default Input;

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.xs,
  },
  label: {
    marginLeft: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.tertiary,
    borderWidth: COMPONENT_SIZES.input.borderWidth,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.component.inputPaddingHorizontal,
  },
  inputDisabled: {
    backgroundColor: COLORS.neutral.gray50,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    paddingVertical: 0,
  },
  inputWithLeftIcon: {
    marginLeft: SPACING.sm,
  },
  inputWithRightIcon: {
    marginRight: SPACING.sm,
  },
  iconWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: COLORS.semantic.error,
    marginLeft: 2,
  },
  helperText: {
    color: COLORS.text.secondary,
    marginLeft: 2,
  },
});
