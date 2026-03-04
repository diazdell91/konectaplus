import COLORS from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { CountryInfo } from "@/utils/phoneCountry";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface PhoneInputSectionProps {
  rawPhone: string;
  onChangePhone: (value: string) => void;
  country: CountryInfo;
  onOpenCountryModal: () => void;
  onPickContact: () => void;
  phoneE164: string;
  isPhoneValid: boolean;
  phoneInputRef: React.RefObject<TextInput | null>;
}

const PhoneInputSection = ({
  rawPhone,
  onChangePhone,
  country,
  onOpenCountryModal,
  onPickContact,
  phoneE164,
  isPhoneValid,
  phoneInputRef,
}: PhoneInputSectionProps) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>Número de destino</Text>

    <View style={styles.row}>
      {/* Country selector */}
      <Pressable style={styles.countryBtn} onPress={onOpenCountryModal}>
        <Text style={styles.flag}>{country.flag}</Text>
        <Text style={styles.callingCode}>{country.callingCode}</Text>
        <Ionicons name="chevron-down" size={14} color={COLORS.text.secondary} />
      </Pressable>

      {/* Phone input */}
      <TextInput
        ref={phoneInputRef}
        style={styles.input}
        value={rawPhone}
        onChangeText={onChangePhone}
        placeholder="Número de teléfono"
        placeholderTextColor={COLORS.neutral.gray400}
        keyboardType="phone-pad"
        returnKeyType="done"
        onSubmitEditing={() => Keyboard.dismiss()}
        maxLength={20}
      />

      {/* Contacts picker */}
      <Pressable
        style={styles.contactsBtn}
        onPress={onPickContact}
        accessibilityLabel="Seleccionar contacto"
      >
        <Ionicons name="person-add-outline" size={20} color={COLORS.primary.main} />
      </Pressable>
    </View>

    {/* E.164 preview */}
    {rawPhone.length > 0 && (
      <Text style={[styles.preview, !isPhoneValid && styles.previewError]}>
        {isPhoneValid ? `${country.flag}  ${phoneE164}` : "Número incompleto"}
      </Text>
    )}
  </View>
);

export default PhoneInputSection;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.surface.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  label: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.text.secondary,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  countryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.neutral.gray100,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  flag: {
    fontSize: 18,
  },
  callingCode: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text.primary,
  },
  input: {
    flex: 1,
    height: 46,
    backgroundColor: COLORS.neutral.gray100,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 16,
    color: COLORS.text.primary,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  contactsBtn: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#EAF7F5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.primary.main,
  },
  preview: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.primary.main,
    marginTop: 8,
  },
  previewError: {
    color: COLORS.semantic.error,
  },
});
