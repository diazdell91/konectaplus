import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SPACING } from "@/theme";
import Button from "./Button";

interface ButtonConfig {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

interface FormFooterProps {
  /** Configuración del botón principal */
  primaryButton?: ButtonConfig;
  /** Configuración del botón secundario */
  secondaryButton?: ButtonConfig;
  /** Contenido personalizado (si no se usan los botones predefinidos) */
  children?: React.ReactNode;
  /** Estilo adicional */
  style?: any;
}

/**
 * FormFooter - Footer estandarizado con botones y safe area
 *
 * Proporciona:
 * - Safe area insets automático en la parte inferior
 * - Layout consistente para botones
 * - Soporte para botón principal y secundario
 * - Opción de contenido personalizado
 *
 * @example
 * ```tsx
 * // Con botón principal
 * <FormFooter
 *   primaryButton={{
 *     title: "Siguiente",
 *     onPress: handleNext,
 *     disabled: !isValid,
 *   }}
 * />
 *
 * // Con botón principal y secundario
 * <FormFooter
 *   primaryButton={{
 *     title: "Guardar",
 *     onPress: handleSave,
 *     loading: isSaving,
 *   }}
 *   secondaryButton={{
 *     title: "Cancelar",
 *     onPress: handleCancel,
 *     variant: "outline",
 *   }}
 * />
 *
 * // Con contenido personalizado
 * <FormFooter>
 *   <Button title="Custom" onPress={handleCustom} />
 *   <Text>Texto adicional</Text>
 * </FormFooter>
 * ```
 */
const FormFooter = ({
  primaryButton,
  secondaryButton,
  children,
  style,
}: FormFooterProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, SPACING.md) },
        style,
      ]}
    >
      {children ? (
        children
      ) : (
        <>
          {secondaryButton && (
            <Button
              title={secondaryButton.title}
              onPress={secondaryButton.onPress}
              disabled={secondaryButton.disabled}
              loading={secondaryButton.loading}
              variant={secondaryButton.variant || "outline"}
              fullWidth
              style={styles.button}
            />
          )}
          {primaryButton && (
            <Button
              title={primaryButton.title}
              onPress={primaryButton.onPress}
              disabled={primaryButton.disabled}
              loading={primaryButton.loading}
              variant={primaryButton.variant || "primary"}
              fullWidth
              style={styles.button}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    gap: SPACING.sm,
  },
  button: {
    marginHorizontal: 0,
  },
});

export default FormFooter;
