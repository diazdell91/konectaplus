import OTPInput from "@/components/otp/OTPInput";
import {
  Button,
  DescriptionText,
  FormFooter,
  FormScreen,
  FormSection,
  IconHeader,
  Text,
} from "@/components/ui";
import { useAuth } from "@/context/AuthProvider";
import { COLORS, SPACING, TYPOGRAPHY } from "@/theme";
import { prettyUS } from "@/utils/phoneUS";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const OtpPhoneScreen = () => {
  const { phone } = useLocalSearchParams<{
    phone?: string;
  }>();

  const [code, setCode] = useState("");

  const [resendCooldown, setResendCooldown] = useState(0);

  const { verifyOtp } = useAuth();

  useEffect(() => {}, [phone]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const validCode = code.length === 6;

  const handleVerifyPhone = () => {
    console.log(phone);
    verifyOtp({
      phone: phone!,
      code,
      device: {
        deviceName: "React Native App",
        deviceId: "MOBILE",
      },
    });
  };

  const handleResendCode = async () => {};

  return (
    <FormScreen
      title="Registro"
      showBack
      showProgress
      currentStep={3}
      totalSteps={6}
      stepLabel="Verificar teléfono"
      footer={
        <FormFooter
          primaryButton={{
            title: "Verificar",
            onPress: handleVerifyPhone,
            disabled: false,
            loading: false,
          }}
          secondaryButton={{
            title: "Cambiar teléfono",
            onPress: () => router.back(),
            variant: "outline",
          }}
        />
      }
    >
      <IconHeader iconName="cellphone-check" />

      <DescriptionText centered>
        Por favor introduce el{" "}
        <Text style={{ fontWeight: "600", color: COLORS.primary.main }}>
          código de 6 dígitos
        </Text>{" "}
        que enviamos a{" "}
        <Text style={{ fontWeight: "600", color: COLORS.primary.main }}>
          {prettyUS(phone?.replace(/\D/g, "") || "")}
        </Text>{" "}
        para verificar tu teléfono.
      </DescriptionText>

      <FormSection>
        <View style={styles.otpContainer}>
          <OTPInput
            length={6}
            value={code}
            onChangeText={setCode}
            autoFocus
            hasError={!validCode && code.length > 0}
            disabled={false}
          />
        </View>

        {!validCode && code.length > 0 && (
          <Text style={styles.errorText}>Código debe tener 6 dígitos</Text>
        )}

        <View style={styles.resendContainer}>
          <Button
            disabled={resendCooldown > 0}
            loading={false}
            title={
              resendCooldown > 0
                ? `Reenviar en ${resendCooldown}s`
                : "Reenviar código"
            }
            onPress={handleResendCode}
            variant="outline"
            fullWidth
          />
        </View>
      </FormSection>
    </FormScreen>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    alignItems: "center",
    marginVertical: SPACING.md,
  },
  errorText: {
    ...TYPOGRAPHY.small,
    color: COLORS.semantic.error,
    textAlign: "center",
    marginTop: SPACING.xs,
  },
  resendContainer: {
    marginTop: SPACING.sm,
  },
});

export default OtpPhoneScreen;
