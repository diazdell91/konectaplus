import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/ui";
import COLORS from "@/theme/colors";
import SPACING from "@/theme/spacing";

/**
 * Tarjeta regalo — inputKind: NONE
 * Pantalla de listado y selección de gift cards disponibles.
 */
export default function GiftCardsScreen() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text h3 style={styles.heading}>
          Tarjetas regalo
        </Text>
        <Text body color={COLORS.text.secondary}>
          Elige una tarjeta regalo para enviar a tus seres queridos.
        </Text>

        {/* TODO: listado de gift cards desde GraphQL */}
        <View style={styles.placeholder}>
          <Text body color={COLORS.text.secondary} align="center">
            Próximamente disponible
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.component.screenPadding,
    paddingTop: SPACING.xl,
    gap: SPACING.md,
  },
  heading: {
    marginBottom: SPACING.xs,
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
});
