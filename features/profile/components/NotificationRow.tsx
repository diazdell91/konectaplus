import { Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { StyleSheet, Switch, View } from "react-native";
import { NotificationItem } from "../constants/notifications.constants";

type Props = {
  item: NotificationItem;
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
  showBorder: boolean;
};

export function NotificationRow({
  item,
  enabled,
  onToggle,
  disabled = false,
  showBorder,
}: Props) {
  return (
    <View style={[styles.row, showBorder && styles.rowBorder]}>
      <View style={styles.rowText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        disabled={disabled}
        trackColor={{ false: COLORS.border.light, true: COLORS.primary.main }}
        thumbColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  subtitle: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
});
