import LedgerItem from "@/components/wallet/LedgerItem";
import { MY_LEDGER_USD, MyLedgerUSDData, MyLedgerUSDVars } from "@/graphql/myLedger";
import { MY_WALLET_USD, MyWalletUSDData } from "@/graphql/myWallet";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function WalletLedgerScreen() {
  const { data: walletData } = useQuery<MyWalletUSDData>(MY_WALLET_USD, {
    fetchPolicy: "cache-and-network",
  });

  const { data, loading, error, refetch } = useQuery<
    MyLedgerUSDData,
    MyLedgerUSDVars
  >(MY_LEDGER_USD, {
    fetchPolicy: "cache-and-network",
    variables: { page: 1, pageSize: 20 },
  });

  const items = data?.myLedgerUSD.items ?? [];
  const balanceCents = walletData?.myWalletUSD?.balanceCachedCents ?? null;

  return (
    <View style={styles.root}>
      {/* Balance card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Saldo disponible</Text>
        <Text style={styles.balanceAmount}>
          {balanceCents !== null ? formatUsd(balanceCents) : "—"}
        </Text>
      </View>

      {/* Transactions */}
      {loading && items.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator color={COLORS.primary.main} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={36} color={COLORS.semantic.error} />
          <Text style={styles.errorText}>Error al cargar el historial</Text>
        </View>
      ) : items.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="receipt-outline" size={40} color={COLORS.neutral.gray300} />
          <Text style={styles.emptyText}>Sin transacciones aún</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={loading}
          renderItem={({ item }) => <LedgerItem item={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  balanceCard: {
    backgroundColor: COLORS.primary.main,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 4,
  },
  balanceLabel: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  balanceAmount: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  list: {
    padding: 16,
    paddingBottom: 40,
  },
  separator: {
    height: 10,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  errorText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.semantic.error,
  },
  emptyText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
  },
});
