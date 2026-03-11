import { Button } from "@/components/ui";
import { WalletTopupProduct } from "@/graphql/walletTopupProducts";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { formatUsd } from "@/utils/currency";
import React from "react";
import { StyleSheet, View } from "react-native";

interface WalletTopupFooterProps {
  selected: WalletTopupProduct | null;
  onContinue: () => void;
}

const WalletTopupFooter = ({ selected, onContinue }: WalletTopupFooterProps) => (
  <View style={styles.footer}>
    <Button
      variant="primary"
      title={selected ? `Continuar · ${formatUsd(selected.priceCents)}` : "Selecciona un monto"}
      onPress={onContinue}
      disabled={selected === null}
    />
  </View>
);

export default WalletTopupFooter;

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: SPACING.component.screenPadding,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
    backgroundColor: COLORS.surface.primary,
  },
});
