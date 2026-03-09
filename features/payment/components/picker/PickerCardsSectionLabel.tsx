import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
  hasTopMargin?: boolean;
}

const PickerCardsSectionLabel = ({ hasTopMargin }: Props) => (
  <Text style={[styles.label, hasTopMargin && styles.labelTop]}>
    Tarjetas guardadas
  </Text>
);

export default PickerCardsSectionLabel;

const styles = StyleSheet.create({
  label: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  labelTop: {
    marginTop: 8,
  },
});
