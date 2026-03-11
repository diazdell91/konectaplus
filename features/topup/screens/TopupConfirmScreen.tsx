import PaymentMethodPicker from "@/features/payment/components/PaymentMethodPicker";
import WalletTopupConfirmFooter from "@/features/wallet/components/WalletTopupConfirmFooter";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import React from "react";
import { StyleSheet, View } from "react-native";
import TopupConfirmHero from "../components/TopupConfirmHero";
import TopupConfirmSummary from "../components/TopupConfirmSummary";
import { useTopupConfirm } from "../hooks/useTopupConfirm";

const TopupConfirmScreen = () => {
  const {
    displayName,
    providerName,
    providerCode,
    phoneE164,
    price,
    selectedMethod,
    setSelectedMethod,
    submitting,
    canConfirm,
    handleConfirm,
  } = useTopupConfirm();

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TopupConfirmHero />

          <TopupConfirmSummary
            phoneE164={phoneE164 ?? ""}
            providerName={providerName ?? ""}
            providerCode={providerCode ?? ""}
            displayName={displayName ?? ""}
            price={price}
          />

          <PaymentMethodPicker
            selectedMethod={selectedMethod}
            onSelect={setSelectedMethod}
          />
        </View>

        <WalletTopupConfirmFooter
          price={price}
          loading={submitting}
          canConfirm={canConfirm}
          onConfirm={handleConfirm}
        />
      </View>
    </View>
  );
};

export default TopupConfirmScreen;

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
