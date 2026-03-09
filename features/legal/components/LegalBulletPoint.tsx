import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
  children: string;
}

const LegalBulletPoint = ({ children }: Props) => (
  <Text style={styles.text}>• {children}</Text>
);

export default LegalBulletPoint;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 16,
    color: COLORS.text.secondary,
    lineHeight: 24,
    marginBottom: 4,
    marginLeft: 16,
  },
});
