import { Text } from "@/components/ui";
import { COLORS, SPACING } from "@/theme";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
}

export function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: SPACING.md,
  },
  sectionTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 13,
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginLeft: SPACING.md,
    marginBottom: SPACING.xs,
    marginTop: SPACING.xs,
  },
});
