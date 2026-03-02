import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS, SPACING } from "@/theme";
import Text from "./Text";

interface FormSectionProps {
  /** Título opcional de la sección */
  title?: string;
  /** Contenido de la sección (inputs, etc.) */
  children: React.ReactNode;
  /** Espaciado entre elementos: 'sm' | 'md' | 'lg' */
  spacing?: "sm" | "md" | "lg";
  /** Estilo adicional para el contenedor */
  style?: any;
}

const SPACING_MAP = {
  sm: SPACING.sm,
  md: SPACING.md,
  lg: SPACING.lg,
};

/**
 * FormSection - Sección estándar para agrupar campos de formulario
 *
 * Proporciona:
 * - Título opcional de sección
 * - Padding horizontal consistente
 * - Spacing configurable entre elementos
 * - Margin bottom automático
 *
 * @example
 * ```tsx
 * <FormSection title="Información Personal">
 *   <Input label="Nombre" value={name} onChangeText={setName} />
 *   <Input label="Apellido" value={lastName} onChangeText={setLastName} />
 * </FormSection>
 * ```
 */
const FormSection = ({
  title,
  children,
  spacing = "md",
  style,
}: FormSectionProps) => {
  return (
    <View style={[styles.container, style]}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      <View style={[styles.content, { gap: SPACING_MAP[spacing] }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  sectionTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    letterSpacing: 0.3,
  },
  content: {
    // gap se aplica dinámicamente
  },
});

export default FormSection;
