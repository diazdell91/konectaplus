import { Button, Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  onOpenSettings: () => void;
};

export function PushPermissionDeniedCard({ onOpenSettings }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Notificaciones desactivadas en el sistema</Text>
      <Text style={styles.subtitle}>
        Para recibir alertas push, habilítalas desde los ajustes del dispositivo.
      </Text>
      <View style={styles.actions}>
        <Button
          title="Abrir ajustes"
          size="sm"
          fullWidth={false}
          variant="outline"
          onPress={onOpenSettings}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface.primary,
    borderWidth: 1,
    borderColor: COLORS.semantic.warning + "33",
    borderRadius: 16,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  title: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    color: COLORS.text.primary,
    fontWeight: "600",
  },
  subtitle: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.text.secondary,
    lineHeight: 19,
  },
  actions: {
    flexDirection: "row",
  },
});
