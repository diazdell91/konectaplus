import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DetailRowProps {
  label: string;
  value: string;
}

export const DetailRow = ({ label, value }: DetailRowProps) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const OrderDetailSection = ({ title, children }: SectionProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.card}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 6,
    marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowLabel: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
    flex: 1,
  },
  rowValue: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    color: COLORS.text.primary,
    flexShrink: 1,
    textAlign: "right",
    marginLeft: 12,
  },
});
