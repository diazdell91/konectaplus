import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  balance: number;
  isSelected: boolean;
  onPress: () => void;
}

const PickerWalletOption = ({ balance, isSelected, onPress }: Props) => (
  <>
    <Text style={styles.sectionLabel}>Saldo digital</Text>
    <Pressable
      style={({ pressed }) => [
        styles.row,
        isSelected && styles.rowSelected,
        pressed && styles.rowPressed,
      ]}
      onPress={onPress}
    >
      <View style={[styles.iconWrap, { backgroundColor: "#EAF7F5" }]}>
        <Ionicons name="wallet-outline" size={20} color={COLORS.primary.main} />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>Wallet KonectaPlus</Text>
        <Text style={styles.rowSub}>Saldo: {formatUsd(balance)}</Text>
      </View>
      {isSelected && (
        <Ionicons name="checkmark-circle" size={20} color={COLORS.primary.main} />
      )}
    </Pressable>
  </>
);

export default PickerWalletOption;

const styles = StyleSheet.create({
  sectionLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 2,
  },
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
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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
});
