import { Button, Text } from "@/components/ui";
import COLORS from "@/theme/colors";
import SPACING from "@/theme/spacing";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const NAUTA_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RechargeNautaScreen() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const normalized = email.trim().toLowerCase();
  const isValidEmail = NAUTA_REGEX.test(normalized);
  const isValidNauta = normalized.endsWith("@nauta.cu");
  const isValid = isValidEmail && isValidNauta;

  const errorMessage =
    touched && email.length > 0
      ? !isValidEmail
        ? "Debe ser un correo válido"
        : !isValidNauta
          ? "Debe terminar en @nauta.cu"
          : null
      : null;

  const handleContinue = () => {
    // TODO: navegar a pantalla de selección de monto / confirmación
    console.log("nauta email:", normalized);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text h3 style={styles.heading}>
            Recarga de correo Nauta
          </Text>
          <Text body color={COLORS.text.secondary} style={styles.sub}>
            Ingresa el correo Nauta del destinatario.
          </Text>

          <View style={styles.inputWrapper}>
            <Text label style={styles.label}>
              Correo Nauta
            </Text>
            <TextInput
              style={[styles.input, errorMessage ? styles.inputError : null]}
              value={email}
              onChangeText={(t) => setEmail(t.trim().toLowerCase())}
              onBlur={() => setTouched(true)}
              placeholder="usuario@nauta.cu"
              placeholderTextColor={COLORS.text.secondary}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
            />
            {errorMessage && (
              <Text small color={COLORS.semantic.error} style={styles.error}>
                {errorMessage}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Recargar"
            variant="primary"
            onPress={handleContinue}
            disabled={!isValid}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: SPACING.component.screenPadding,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  content: {
    flex: 1,
    gap: SPACING.md,
  },
  heading: {
    marginBottom: SPACING.xs,
  },
  sub: {
    marginBottom: SPACING.lg,
  },
  inputWrapper: {
    marginTop: SPACING.md,
    gap: 6,
  },
  label: {
    color: COLORS.text.secondary,
  },
  input: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    color: COLORS.text.primary,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary.main,
    paddingVertical: SPACING.sm,
  },
  inputError: {
    borderBottomColor: COLORS.semantic.error,
  },
  error: {
    marginTop: 4,
  },
  footer: {
    paddingTop: SPACING.lg,
  },
});
