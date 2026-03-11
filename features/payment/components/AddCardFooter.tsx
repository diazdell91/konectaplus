import { Button } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import React from "react";
import { StyleSheet, View } from "react-native";
import SecureBadgeRow from "./SecureBadgeRow";

interface AddCardFooterProps {
  saving: boolean;
  isComplete: boolean;
  onSave: () => void;
}

const AddCardFooter = ({ saving, isComplete, onSave }: AddCardFooterProps) => (
  <View style={styles.footer}>
    <Button
      variant="primary"
      title={saving ? "Guardando..." : "Guardar tarjeta"}
      onPress={onSave}
      disabled={!isComplete || saving}
    />
    <SecureBadgeRow />
  </View>
);

export default AddCardFooter;

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: SPACING.component.screenPadding,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.md,
    backgroundColor: COLORS.surface.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
  },
});
