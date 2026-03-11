import { COLORS } from "@/theme/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import WalletLedgerBalanceCard from "../components/WalletLedgerBalanceCard";
import WalletLedgerList from "../components/WalletLedgerList";
import { useWalletLedger } from "../hooks/useWalletLedger";

const WalletLedgerScreen = () => {
  const { items, balance, loading, error, refetch } = useWalletLedger();

  return (
    <View style={styles.root}>
      <WalletLedgerBalanceCard balance={balance} />
      <WalletLedgerList
        items={items}
        loading={loading}
        error={error}
        onRefresh={refetch}
      />
    </View>
  );
};

export default WalletLedgerScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
});
