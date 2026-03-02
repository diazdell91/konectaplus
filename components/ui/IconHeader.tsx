import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { COLORS, SPACING } from "@/theme";

interface IconHeaderProps {
  /** Nombre del icono de MaterialCommunityIcons */
  iconName: React.ComponentProps<typeof Icon>["name"];
  /** Tamaño del contenedor: 'sm' | 'md' | 'lg' */
  size?: "sm" | "md" | "lg";
  /** Color del icono (por defecto: COLORS.primary.main) */
  color?: string;
  /** Estilo adicional para el contenedor */
  style?: any;
}

const SIZE_CONFIG = {
  sm: {
    containerSize: 80,
    iconSize: 40,
  },
  md: {
    containerSize: 100,
    iconSize: 48,
  },
  lg: {
    containerSize: 120,
    iconSize: 64,
  },
};

/**
 * IconHeader - Icono decorativo circular para headers de pantallas
 *
 * Proporciona:
 * - Icono centrado en círculo con fondo
 * - Tamaños predefinidos consistentes
 * - Padding vertical automático
 *
 * @example
 * ```tsx
 * <IconHeader iconName="email-edit" size="md" />
 * <IconHeader iconName="account-circle" size="lg" color={COLORS.semantic.success} />
 * ```
 */
const IconHeader = ({
  iconName,
  size = "md",
  color = COLORS.primary.main,
  style,
}: IconHeaderProps) => {
  const config = SIZE_CONFIG[size];

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.iconCircle,
          {
            width: config.containerSize,
            height: config.containerSize,
            borderRadius: config.containerSize / 2,
          },
        ]}
      >
        <Icon name={iconName} size={config.iconSize} color={color} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  iconCircle: {
    backgroundColor: COLORS.neutral.gray50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconHeader;
