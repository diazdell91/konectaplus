import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DetailRow, OrderDetailSection } from "./OrderDetailSection";

interface OrderDetailPricingProps {
  baseAmountCents: number;
  feeAmountCents: number;
  totalAmountCents: number;
}

const OrderDetailPricing = ({
  baseAmountCents,
  feeAmountCents,
  totalAmountCents,
}: OrderDetailPricingProps) => (
  <OrderDetailSection title="Desglose de precio">
    <DetailRow label="Monto base" value={formatUsd(baseAmountCents)} />
    <DetailRow label="Comisión" value={formatUsd(feeAmountCents)} />
    <View style={styles.divider} />
    <View style={styles.totalRow}>
      <Text style={styles.totalLabel}>Total</Text>
      <Text style={styles.totalValue}>{formatUsd(totalAmountCents)}</Text>
    </View>
  </OrderDetailSection>
);

export default OrderDetailPricing;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COLORS.border.light,
    marginVertical: 2,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  totalLabel: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 15,
    color: COLORS.text.primary,
    flex: 1,
  },
  totalValue: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 15,
    color: COLORS.primary.main,
  },
});
