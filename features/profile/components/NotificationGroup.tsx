import { Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NotificationGroup as NotificationGroupType } from "../constants/notifications.constants";
import { NotificationRow } from "./NotificationRow";

type Props = {
  group: NotificationGroupType;
  enabled: Record<string, boolean>;
  onToggle: (key: string) => void;
};

export function NotificationGroup({ group, enabled, onToggle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{group.label}</Text>
      <View style={styles.card}>
        {group.items.map((item, idx) => (
          <NotificationRow
            key={item.key}
            item={item}
            enabled={enabled[item.key] ?? false}
            onToggle={() => onToggle(item.key)}
            showBorder={idx < group.items.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xs,
  },
  label: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  card: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    overflow: "hidden",
  },
});
