import { SavedCard } from "@/graphql/paymentMethods";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const BRAND_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  visa: { label: "VISA", color: "#1A1F71", bg: "#EEF0FB" },
  mastercard: { label: "MC", color: "#EB001B", bg: "#FEF0F0" },
  amex: { label: "AMEX", color: "#007BC1", bg: "#EDF6FD" },
};

function getBrandConfig(brand: string) {
  return (
    BRAND_CONFIG[brand.toLowerCase()] ?? {
      label: brand.toUpperCase().slice(0, 4),
      color: COLORS.text.secondary,
      bg: COLORS.background.tertiary,
    }
  );
}

interface Props {
  card: SavedCard;
  isSelected: boolean;
  onPress: () => void;
}

const PickerCardRow = ({ card, isSelected, onPress }: Props) => {
  const cfg = getBrandConfig(card.brand);
  const exp = `${String(card.expMonth).padStart(2, "0")}/${String(card.expYear).slice(-2)}`;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        isSelected && styles.rowSelected,
        pressed && styles.rowPressed,
      ]}
      onPress={onPress}
    >
      <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
        <Text style={[styles.badgeLabel, { color: cfg.color }]}>{cfg.label}</Text>
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>•••• {card.last4}</Text>
        <Text style={styles.rowSub}>Vence {exp}</Text>
      </View>
      {card.isDefault && (
        <View style={styles.defaultBadge}>
          <Text style={styles.defaultText}>Principal</Text>
        </View>
      )}
      {isSelected && (
        <Ionicons name="checkmark-circle" size={20} color={COLORS.primary.main} />
      )}
    </Pressable>
  );
};

export default PickerCardRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  rowSelected: {
    borderColor: COLORS.primary.main,
    backgroundColor: "#EAF7F5",
  },
  rowPressed: {
    backgroundColor: COLORS.background.secondary,
  },
  badge: {
    width: 48,
    height: 30,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeLabel: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
    fontStyle: "italic",
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
    letterSpacing: 0.3,
  },
  rowSub: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  defaultBadge: {
    backgroundColor: "#EAF7F5",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  defaultText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary.main,
  },
});
