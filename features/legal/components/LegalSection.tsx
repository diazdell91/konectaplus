import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  children: ReactNode;
}

const LegalSection = ({ title, children }: Props) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
);

export default LegalSection;

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  title: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text.primary,
    marginBottom: 12,
  },
});
