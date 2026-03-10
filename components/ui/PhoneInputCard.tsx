import { type CountryUI } from "@/constants/phoneCountries";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import type { ViewStyle } from "react-native";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, {
  AnimatedStyle,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

interface PhoneInputCardProps {
  selectedCountry: CountryUI;
  phoneDigits: string;
  inputRef: React.RefObject<TextInput | null>;
  borderStyle: AnimatedStyle<ViewStyle>;
  error: string | null;
  isValid: boolean;
  onChangePhone: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSubmit: () => void;
  onPressCountry: () => void;
}

const PhoneInputCard = ({
  selectedCountry,
  phoneDigits,
  inputRef,
  borderStyle,
  error,
  isValid,
  onChangePhone,
  onFocus,
  onBlur,
  onSubmit,
  onPressCountry,
}: PhoneInputCardProps) => (
  <Animated.View
    entering={FadeInDown.delay(220).springify()}
    style={styles.container}
  >
    <Text style={styles.label}>Número de teléfono</Text>

    <Animated.View style={[styles.inputRow, borderStyle]}>
      <Pressable style={styles.countryBtn} onPress={onPressCountry} hitSlop={8}>
        {selectedCountry.flag ? (
          <Image
            source={selectedCountry.flag}
            style={styles.flagImg}
            contentFit="cover"
          />
        ) : (
          <Text style={styles.flagFallback}>🌍</Text>
        )}
        <Text style={styles.dialCode}>{selectedCountry.dialCode}</Text>
        <Ionicons name="chevron-down" size={14} color={COLORS.text.secondary} />
      </Pressable>

      <View style={styles.divider} />

      <TextInput
        ref={inputRef}
        style={styles.input}
        value={phoneDigits}
        onChangeText={onChangePhone}
        keyboardType="phone-pad"
        placeholder="000 000 0000"
        placeholderTextColor={COLORS.neutral.gray300}
        autoComplete="tel"
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {isValid && (
        <Animated.View entering={FadeInUp.duration(200)}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={COLORS.primary.main}
            style={{ marginRight: 14 }}
          />
        </Animated.View>
      )}
    </Animated.View>

    {error && (
      <Animated.Text entering={FadeInDown.duration(200)} style={styles.error}>
        {error}
      </Animated.Text>
    )}
  </Animated.View>
);

export default PhoneInputCard;

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
  },
  label: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border.light,
    overflow: "hidden",
    minHeight: 58,
  },
  countryBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 6,
  },
  flagImg: {
    width: 24,
    height: 18,
    borderRadius: 2,
  },
  flagFallback: {
    fontSize: 20,
    lineHeight: 24,
  },
  dialCode: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.border.light,
  },
  input: {
    flex: 1,
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.text.primary,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  error: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.semantic.error,
    marginTop: 2,
    marginLeft: 4,
  },
});
