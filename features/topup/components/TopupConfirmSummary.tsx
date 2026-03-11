import SummaryRow from "@/features/payment/components/SummaryRow";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TopupConfirmSummaryProps {
  phoneE164: string;
  providerName: string;
  providerCode: string;
  displayName: string;
  price: number;
}

const TopupConfirmSummary = ({
  phoneE164,
  providerName,
  providerCode,
  displayName,
  price,
}: TopupConfirmSummaryProps) => (
  <View>
    <View style={styles.summary}>
      <SummaryRow label="Destino" value={phoneE164} />
      <SummaryRow label="Proveedor" value={providerName || providerCode} />
      <SummaryRow label="Oferta" value={displayName} highlight />
      <View style={styles.divider} />
      <SummaryRow label="Total a pagar" value={formatUsd(price)} bold />
    </View>

    <Text style={styles.sectionLabel}>Método de pago</Text>
  </View>
);

export default TopupConfirmSummary;

const styles = StyleSheet.create({
  summary: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border.light,
  },
  sectionLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginTop: 16,
    marginBottom: 4,
  },
});
