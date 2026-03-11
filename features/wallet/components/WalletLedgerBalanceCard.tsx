import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import { formatUsd } from "@/utils/currency";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface WalletLedgerBalanceCardProps {
  balance: number | null;
}

const WalletLedgerBalanceCard = ({ balance }: WalletLedgerBalanceCardProps) => (
  <View style={styles.card}>
    <Text style={styles.label}>Saldo disponible</Text>
    <Text style={styles.amount}>
      {balance !== null ? formatUsd(balance) : "—"}
    </Text>
  </View>
);

export default WalletLedgerBalanceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary.main,
    marginHorizontal: SPACING.component.screenPadding,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  amount: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 44,
    color: "#FFFFFF",
  },
});
