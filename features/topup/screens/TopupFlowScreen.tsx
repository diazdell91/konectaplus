import { TopupTypeTabs } from "@/features/topup/components";
import TopupFooter from "@/features/topup/components/footer/TopupFooter";
import OfferList from "@/features/topup/components/offers/OfferList";
import PhoneProviderSummary from "@/features/topup/components/summary/PhoneProviderSummary";
import { COLORS } from "@/theme/colors";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTopupFlow } from "../hooks/useTopupFlow";

const TopupFlowScreen = () => {
  const {
    countryIso2,
    callingCode,
    phoneNormalized,
    products,
    topupType,
    counts,
    selectedProduct,
    loading,
    error,
    canProceed,
    handleSelectProduct,
    handleSelectType,
    handlePayNow,
    refetch,
  } = useTopupFlow();

  return (
    <View style={styles.root}>
      <PhoneProviderSummary
        phone={phoneNormalized}
        countryIso={countryIso2 ?? ""}
        callingCode={callingCode}
        onEditPhone={() => router.push("/services/topup/topup-phone-picker")}
      />

      <View style={styles.content}>
        <TopupTypeTabs
          counts={counts}
          selectedType={topupType}
          onSelectType={handleSelectType}
        />

        <View style={styles.offerList}>
          <OfferList
            products={products}
            topupType={topupType}
            selectedProductId={selectedProduct?.id ?? null}
            onSelectProduct={handleSelectProduct}
            loading={loading}
            error={error}
            onRetry={() => refetch()}
          />
        </View>
      </View>

      <TopupFooter
        selectedListing={selectedProduct}
        canProceed={canProceed}
        onAddToCart={() => {
          // TODO: integrar con cart/checkout
        }}
        onPayNow={handlePayNow}
      />
    </View>
  );
};

export default TopupFlowScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  content: {
    flex: 1,
    paddingTop: 12,
  },
  offerList: {
    flex: 1,
  },
});
