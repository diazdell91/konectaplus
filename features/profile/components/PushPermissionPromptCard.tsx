import { Button, Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  loading?: boolean;
  onAccept: () => void;
  onDismiss: () => void;
};

export function PushPermissionPromptCard({
  loading = false,
  onAccept,
  onDismiss,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Activa tus notificaciones push</Text>
      <Text style={styles.subtitle}>
        Recibe alertas en tiempo real sobre pedidos, recargas y promociones.
      </Text>

      <View style={styles.actions}>
        <Button
          title="Activar notificaciones"
          size="sm"
          fullWidth={false}
          loading={loading}
          onPress={onAccept}
        />
        <Button
          title="Ahora no"
          size="sm"
          fullWidth={false}
          variant="ghost"
          disabled={loading}
          onPress={onDismiss}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface.primary,
    borderWidth: 1,
    borderColor: COLORS.border.light,
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
    gap: SPACING.xs,
    alignItems: "center",
  },
});
