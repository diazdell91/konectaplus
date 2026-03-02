import { COLORS, SPACING, TYPOGRAPHY } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";

interface DescriptionTextProps {
  /** Contenido del texto (puede incluir componentes Text anidados para highlights) */
  children: React.ReactNode;
  /** Centrar el texto */
  centered?: boolean;
  /** Estilo adicional */
  style?: any;
}

/**
 * DescriptionText - Texto de descripción estándar para pantallas
 *
 * Proporciona:
 * - Estilo consistente para descripciones
 * - Soporte para texto con highlights (usando Text anidado)
 * - Padding horizontal automático
 * - Alineación configurable
 *
 * @example
 * ```tsx
 * // Texto simple centrado
 * <DescriptionText centered>
 *   Por favor introduce tu correo electrónico para continuar.
 * </DescriptionText>
 *
 * // Texto con highlights
 * <DescriptionText centered>
 *   Por favor introduce tu <Text bold primary>Correo electrónico</Text> asegurándote que sea correcto.
 * </DescriptionText>
 * ```
 */
const DescriptionText = ({
  children,
  centered = false,
  style,
}: DescriptionTextProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.description, centered && styles.centered, style]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  description: {
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: TYPOGRAPHY.body.fontSize,
    color: COLORS.text.primary,
    lineHeight: 22,
  },
  centered: {
    textAlign: "center",
  },
});

export default DescriptionText;
