import { COLORS, SPACING, TYPOGRAPHY } from "@/theme";
import React, { useEffect, useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface OTPInputProps {
  length?: number;
  value: string;
  onChangeText: (value: string) => void;
  autoFocus?: boolean;
  hasError?: boolean;
  disabled?: boolean;
}

export default function OTPInput({
  length = 6,
  value,
  onChangeText,
  autoFocus = false,
  hasError = false,
  disabled = false,
}: OTPInputProps) {
  // Split value into array of digits
  const digits = value
    .split("")
    .concat(Array(length).fill(""))
    .slice(0, length);

  const inputRefs = Array(length)
    .fill(0)
    .map(() => useRef<TextInput>(null));

  useEffect(() => {
    if (autoFocus && !disabled) {
      inputRefs[0].current?.focus();
    }
  }, [autoFocus, disabled]);

  const handleChangeText = (text: string, index: number) => {
    if (disabled) return;

    // Handle paste operation
    if (text.length > 1) {
      const pastedDigits = text.slice(0, length).replace(/\D/g, "");
      onChangeText(pastedDigits);

      // Focus on the next empty field or the last field
      const nextEmptyIndex = Math.min(pastedDigits.length, length - 1);
      inputRefs[nextEmptyIndex].current?.focus();
      return;
    }

    // Handle single digit input
    if (/^\d$/.test(text)) {
      const newValue =
        value.substring(0, index) + text + value.substring(index + 1);
      onChangeText(newValue.slice(0, length));

      // Move to next field
      if (index < length - 1) {
        inputRefs[index + 1].current?.focus();
      }
    } else if (text === "") {
      // Handle deletion
      const newValue = value.substring(0, index) + value.substring(index + 1);
      onChangeText(newValue);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (disabled) return;

    if (key === "Backspace") {
      if (digits[index] === "" && index > 0) {
        // Move to previous field on backspace if current field is empty
        inputRefs[index - 1].current?.focus();
      } else {
        // Clear current field
        const newValue = value.substring(0, index) + value.substring(index + 1);
        onChangeText(newValue);
      }
    }
  };

  return (
    <View style={styles.container}>
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={inputRefs[index]}
          style={[
            styles.input,
            hasError && styles.inputError,
            digit !== "" && styles.inputFilled,
            disabled && styles.inputDisabled,
          ]}
          value={digit}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={({ nativeEvent }) =>
            handleKeyPress(nativeEvent.key, index)
          }
          keyboardType="number-pad"
          maxLength={length} // Allow paste operation
          selectTextOnFocus
          textAlign="center"
          placeholder="0"
          placeholderTextColor={COLORS.neutral.gray300}
          editable={!disabled}
          autoComplete="one-time-code"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  input: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border.light,
    backgroundColor: COLORS.neutral.gray50,
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    textAlign: "center",
  },
  inputFilled: {
    borderColor: COLORS.primary.main,
    backgroundColor: COLORS.background.primary,
  },
  inputError: {
    borderColor: COLORS.semantic.error,
    backgroundColor: `${COLORS.semantic.error}10`,
  },
  inputDisabled: {
    backgroundColor: COLORS.neutral.gray100,
    opacity: 0.6,
  },
});
