// components/ui/Input.tsx
import { COLORS, SIZES, SPACING } from "@/theme";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  View,
} from "react-native";
import Text from "./Text";

type InputSize = "sm" | "md" | "lg";

type InputPropsParams = {
  label?: string;
  iconLeft?: React.ComponentProps<typeof Icon>["name"];
  iconRight?: React.ComponentProps<typeof Icon>["name"];
  onPressRight?: () => void;
  onLeftIconPress?: () => void;
  helperText?: string;
  error?: string;
  size?: InputSize;
  showPasswordToggle?: boolean;
};

export type InputProps = InputPropsParams & RNTextInputProps;

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
    ...otherProps
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const innerRef = useRef<RNTextInput>(null);

  useImperativeHandle(ref, () => innerRef.current as RNTextInput);

  const getHeight = () => {
    switch (size) {
      case "sm":
        return 36;
      case "md":
        return SIZES.inputHeight; // 44px
      case "lg":
        return 52;
      default:
        return SIZES.inputHeight;
    }
  };

  const height = getHeight();

  // Determine if we should show password toggle
  const isPassword = secureTextEntry || showPasswordToggle;
  const shouldShowPasswordToggle = isPassword && showPasswordToggle;

  // Get the right icon
  const getRightIcon = () => {
    if (shouldShowPasswordToggle) {
      return isPasswordVisible ? "eye-off" : "eye";
    }
    return iconRight;
  };

  // Get the right icon press handler
  const getRightIconPress = () => {
    if (shouldShowPasswordToggle) {
      return () => setIsPasswordVisible(!isPasswordVisible);
    }
    return onPressRight;
  };

  const rightIconName = getRightIcon();
  const rightIconPressHandler = getRightIconPress();

  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputContainer, { height }]}>
        {iconLeft && (
          <Pressable onPress={onLeftIconPress} style={styles.iconLeft}>
            <Icon name={iconLeft} size={20} color={COLORS.neutral.gray400} />
          </Pressable>
        )}

        <RNTextInput
          ref={innerRef}
          style={[
            styles.input,
            iconLeft && styles.inputWithLeftIcon,
            (rightIconName || shouldShowPasswordToggle) &&
              styles.inputWithRightIcon,
          ]}
          placeholder={otherProps.placeholder}
          placeholderTextColor="#9CA3AF"
          editable={editable}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...otherProps}
        />

        {(rightIconName || shouldShowPasswordToggle) && (
          <Pressable onPress={rightIconPressHandler} style={styles.iconRight}>
            <Icon
              name={rightIconName || "eye"}
              size={20}
              color={COLORS.neutral.gray400}
            />
          </Pressable>
        )}
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
      {!!helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
});

Input.displayName = "Input";

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.xs,
  },
  label: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.light.grey06,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    borderRadius: SIZES.inputRadius,
    paddingHorizontal: SPACING.md,
  },
  input: {
    flex: 1,
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: COLORS.text.primary,
    paddingVertical: 0, // Remove default padding for better vertical centering
  },
  inputWithLeftIcon: {
    marginLeft: SPACING.sm,
  },
  inputWithRightIcon: {
    marginRight: SPACING.sm,
  },
  iconLeft: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconRight: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
    color: COLORS.semantic.error,
    marginTop: 4,
    marginLeft: 4,
  },
  helperText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    color: COLORS.text.secondary,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Input;
