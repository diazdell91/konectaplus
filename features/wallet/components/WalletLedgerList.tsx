import LedgerItem from "@/features/wallet/components/LedgerItem";
import { LedgerItem as LedgerItemType } from "@/graphql/myLedger";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface WalletLedgerListProps {
  items: LedgerItemType[];
  loading: boolean;
  error: unknown;
  onRefresh: () => void;
}

const WalletLedgerList = ({ items, loading, error, onRefresh }: WalletLedgerListProps) => {
  if (loading && items.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={COLORS.primary.main} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={36} color={COLORS.semantic.error} />
        <Text style={styles.errorText}>Error al cargar el historial</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.centered}>
        <Ionicons name="receipt-outline" size={40} color={COLORS.neutral.gray300} />
        <Text style={styles.emptyText}>Sin transacciones aún</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={loading}
      renderItem={({ item }) => <LedgerItem item={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default WalletLedgerList;

const styles = StyleSheet.create({
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
