import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  label: string;
  value: string;
  highlight?: boolean;
  bold?: boolean;
}

const SummaryRow = ({ label, value, highlight, bold }: Props) => (
  <View style={styles.row}>
    <Text style={[styles.label, highlight && styles.labelHighlight]}>
      {label}
    </Text>
    <Text
      style={[
        styles.value,
        bold && styles.valueBold,
        highlight && styles.valueHighlight,
      ]}
    >
      {value}
    </Text>
  </View>
);

export default SummaryRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  label: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  labelHighlight: {
    fontFamily: FONT_FAMILIES.medium,
    color: COLORS.text.primary,
  },
  value: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 14,
    color: COLORS.text.primary,
  },
  valueBold: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 17,
    fontWeight: "700",
  },
  valueHighlight: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary.main,
  },
});
