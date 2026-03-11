import { Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WalletBalanceHero from "../components/WalletBalanceHero";
import WalletAmountList from "../components/WalletAmountList";
import WalletCostSummary from "../components/WalletCostSummary";
import WalletTopupFooter from "../components/WalletTopupFooter";
import { useWalletTopup } from "../hooks/useWalletTopup";

const WalletTopupScreen = () => {
  const { selected, setSelected, products, balance, loading, error, handleContinue } =
    useWalletTopup();

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <WalletBalanceHero balance={balance} />

        <Text style={styles.sectionLabel}>Selecciona el monto</Text>

        <WalletAmountList
          products={products}
          selected={selected}
          loading={loading}
          error={error}
          onSelect={setSelected}
        />

        {selected && <WalletCostSummary product={selected} />}
      </ScrollView>

      <WalletTopupFooter selected={selected} onContinue={handleContinue} />
    </SafeAreaView>
  );
};

export default WalletTopupScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  scroll: {
    paddingHorizontal: SPACING.component.screenPadding,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.lg,
  },
  sectionLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
});
