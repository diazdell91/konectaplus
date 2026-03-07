import { Button, Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecipientsScreen() {
  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <View style={styles.empty}>
        <View style={styles.iconWrap}>
          <Ionicons name="people-outline" size={48} color={COLORS.primary.main} />
        </View>
        <Text style={styles.title}>Sin beneficiarios guardados</Text>
        <Text style={styles.subtitle}>
          Agrega las personas que reciben tus envíos para encontrarlas fácilmente la próxima vez.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          variant="primary"
          title="Agregar beneficiario"
          onPress={() => {}}
          disabled
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
    justifyContent: "space-between",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.component.screenPadding,
    gap: SPACING.md,
  },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#EAF7F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  title: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text.primary,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: SPACING.component.screenPadding,
    paddingBottom: SPACING.xl,
  },
});
