import {
  DescriptionText,
  FormFooter,
  FormScreen,
  FormSection,
  IconHeader,
  Input,
  Text,
} from "@/components/ui";
import { useAuth } from "@/context/AuthProvider";
import { COLORS, SPACING, TYPOGRAPHY } from "@/theme";
import {
  isValidUSPhone,
  onlyDigits,
  prettyUS,
  toE164US,
} from "@/utils/phoneUS";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TextInput as RNTextInput, StyleSheet, View } from "react-native";

const Index = () => {
  const [phoneDigits, setPhoneDigits] = useState("");
  const formatted = useMemo(() => prettyUS(phoneDigits), [phoneDigits]);
  const valid = useMemo(() => isValidUSPhone(phoneDigits), [phoneDigits]);
  const { requestOtp } = useAuth();

  console.log(formatted);
  console.log(phoneDigits);

  const inputRef = useRef<RNTextInput | null>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (val: string) => {
    let digits = onlyDigits(val);
    const MAX = 10;
    if (digits.length > MAX) digits = digits.slice(0, MAX);
    setPhoneDigits(digits);
  };

  const handleNext = () => {
    const e164 = toE164US(phoneDigits);
    if (!e164) return;
    requestOtp({
      phone: phoneDigits,
      purpose: "LOGIN",
    });
    router.push({
      pathname: "/otp-phone",
      params: { phone: phoneDigits },
    });
  };

  return (
    <FormScreen
      title="Registro"
      showBack
      showProgress
      currentStep={1}
      totalSteps={2}
      stepLabel="Número de teléfono"
      footer={
        <FormFooter
          primaryButton={{
            title: "Siguiente",
            onPress: handleNext,
            disabled: !valid,
          }}
        />
      }
    >
      <IconHeader iconName="cellphone-check" />

      <DescriptionText centered>
        Para crear tu cuenta, por favor ingresa tu{" "}
        <Text style={{ fontWeight: "600", color: COLORS.primary.main }}>
          Número de teléfono
        </Text>{" "}
        para verificar tu identidad y proteger tu cuenta.
      </DescriptionText>

      <FormSection>
        <Input
          ref={inputRef as any}
          label="Número de teléfono"
          value={formatted}
          onChangeText={handleChange}
          autoFocus
          maxLength={16}
          iconLeft="cellphone"
          iconRight={valid ? "check-circle" : undefined}
          keyboardType="phone-pad"
          autoComplete="tel"
          placeholder="(786) 555-1234"
          error={
            !valid && phoneDigits.length > 0
              ? "Número de EE.UU. inválido"
              : undefined
          }
          accessibilityLabel="Número de teléfono"
          accessibilityHint="Ingresa tu número de teléfono en formato (XXX) XXX-XXXX"
          returnKeyType="go"
          returnKeyLabel="Continuar"
          enablesReturnKeyAutomatically
          onSubmitEditing={handleNext}
        />

        {/* Info Box - Verificación OTP */}
        <View style={styles.infoBox}>
          <View style={styles.infoHeader}>
            <Icon
              name="shield-lock-outline"
              size={18}
              color={COLORS.semantic.info}
            />
            <Text style={styles.infoTitle}>Verificación de seguridad</Text>
          </View>
          <Text style={styles.infoText}>
            Recibirás un{" "}
            <Text style={styles.infoTextBold}>
              código de verificación por SMS (OTP)
            </Text>{" "}
            para proteger tu cuenta. Este código es de un solo uso y expirará en
            pocos minutos.
          </Text>
        </View>
      </FormSection>
    </FormScreen>
  );
};

export default Index;

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: COLORS.neutral.gray50,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.semantic.info,
    borderRadius: 8,
    padding: SPACING.md,
    marginTop: SPACING.xs,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  infoTitle: {
    ...TYPOGRAPHY.bodySemiBold,
    fontSize: TYPOGRAPHY.small.fontSize,
    color: COLORS.text.primary,
  },
  infoText: {
    ...TYPOGRAPHY.small,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
  infoTextBold: {
    ...TYPOGRAPHY.bodyMedium,
    fontSize: TYPOGRAPHY.small.fontSize,
    color: COLORS.text.primary,
    fontWeight: "600",
  },
});
