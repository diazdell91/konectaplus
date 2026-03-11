import { Button } from "@/components/ui";
import { formatUsd } from "@/utils/currency";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

interface WalletTopupConfirmFooterProps {
  price: number;
  loading: boolean;
  canConfirm: boolean;
  onConfirm: () => void;
}

const WalletTopupConfirmFooter = ({
  price,
  loading,
  canConfirm,
  onConfirm,
}: WalletTopupConfirmFooterProps) => (
  <View style={styles.footer}>
    <Button
      variant="primary"
      title={loading ? "Procesando..." : `Pagar ${formatUsd(price)}`}
      onPress={onConfirm}
      disabled={!canConfirm}
    />
    <Button
      variant="ghost"
      title="Cancelar"
      onPress={() => router.back()}
      disabled={loading}
    />
  </View>
);

export default WalletTopupConfirmFooter;

const styles = StyleSheet.create({
  footer: {
    gap: 10,
    paddingTop: 16,
  },
});
