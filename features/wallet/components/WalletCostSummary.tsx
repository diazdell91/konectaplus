import { Text } from "@/components/ui";
import { WalletTopupProduct } from "@/graphql/walletTopupProducts";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import React from "react";
import { StyleSheet, View } from "react-native";

interface WalletCostSummaryProps {
  product: WalletTopupProduct;
}

const WalletCostSummary = ({ product }: WalletCostSummaryProps) => (
  <View style={styles.summary}>
    <View style={styles.row}>
      <Text style={styles.label}>Saldo a recibir</Text>
      <Text style={styles.value}>{formatUsd(product.amountCents)}</Text>
    </View>
    {product.feeCents > 0 && (
      <View style={styles.row}>
        <Text style={styles.label}>Cargo por servicio</Text>
        <Text style={styles.value}>{formatUsd(product.feeCents)}</Text>
      </View>
    )}
    <View style={styles.divider} />
    <View style={styles.row}>
      <Text style={styles.total}>Total a pagar</Text>
      <Text style={styles.totalValue}>{formatUsd(product.priceCents)}</Text>
    </View>
  </View>
);

export default WalletCostSummary;

const styles = StyleSheet.create({
  summary: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  label: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  value: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border.light,
  },
  total: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  totalValue: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary.main,
  },
});
