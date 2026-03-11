import PaymentMethodPicker from "@/features/payment/components/PaymentMethodPicker";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import React from "react";
import { StyleSheet, View } from "react-native";
import WalletTopupConfirmFooter from "../components/WalletTopupConfirmFooter";
import WalletTopupConfirmHero from "../components/WalletTopupConfirmHero";
import WalletTopupConfirmSummary from "../components/WalletTopupConfirmSummary";
import { useWalletTopupConfirm } from "../hooks/useWalletTopupConfirm";

const WalletTopupConfirmScreen = () => {
  const {
    amount,
    price,
    fee,
    selectedMethod,
    setSelectedMethod,
    loading,
    canConfirm,
    handleConfirm,
  } = useWalletTopupConfirm();

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.content}>
          <WalletTopupConfirmHero />
          <WalletTopupConfirmSummary amount={amount} fee={fee} price={price} />
          <PaymentMethodPicker
            selectedMethod={selectedMethod}
            onSelect={setSelectedMethod}
            hideWallet
          />
        </View>

        <WalletTopupConfirmFooter
          price={price}
          loading={loading}
          canConfirm={canConfirm}
          onConfirm={handleConfirm}
        />
      </View>
    </View>
  );
};

export default WalletTopupConfirmScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: SPACING.component.screenPadding,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  content: {
    flex: 1,
    gap: 12,
  },
});
