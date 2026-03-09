import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
  children: string;
}

const LegalSubSectionTitle = ({ children }: Props) => (
  <Text style={styles.text}>{children}</Text>
);

export default LegalSubSectionTitle;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
});
