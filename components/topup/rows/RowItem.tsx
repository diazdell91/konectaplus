import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { avatarColor, initials } from "./avatarUtils";

export interface RowItemProps {
  displayName: string;
  phone: string;
  label: string;
  flag: string | null;
  onPress?: () => void;
}

const RowItem = ({
  displayName,
  phone,
  label,
  flag,
  onPress,
}: RowItemProps) => {
  const bg = avatarColor(displayName || phone);
  const ini = initials(displayName || phone);

  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={onPress}
    >
      <View style={[styles.avatarCircle, { backgroundColor: bg }]}>
        <Text style={styles.avatarInitials}>{ini}</Text>
        {flag ? (
          <View style={styles.flagBadge}>
            <Text style={styles.flagText}>{flag}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.rowContent}>
        <Text style={styles.rowName} numberOfLines={1} ellipsizeMode="tail">
          {displayName || phone}
        </Text>
        <Text style={styles.rowPhone} numberOfLines={1}>
          {displayName ? phone.trim() : ""}
          {label ? (
            <Text style={styles.rowLabel}>
              {displayName ? `  (${label})` : `(${label})`}
            </Text>
          ) : null}
        </Text>
      </View>
    </Pressable>
  );
};

export default RowItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginVertical: 4,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  rowPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarInitials: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  flagBadge: {
    position: "absolute",
    bottom: -2,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  flagText: {
    fontSize: 12,
  },
  rowContent: {
    flex: 1,
  },
  rowName: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 2,
  },
  rowPhone: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: "#6C7B8A",
  },
  rowLabel: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: "#9AA5B4",
  },
});
