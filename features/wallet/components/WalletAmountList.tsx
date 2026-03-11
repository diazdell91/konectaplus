import { Text } from "@/components/ui";
import { WalletTopupProduct } from "@/graphql/walletTopupProducts";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import WalletAmountCard from "./WalletAmountCard";

interface WalletAmountListProps {
  products: WalletTopupProduct[];
  selected: WalletTopupProduct | null;
  loading: boolean;
  error: unknown;
  onSelect: (product: WalletTopupProduct) => void;
}

const WalletAmountList = ({
  products,
  selected,
  loading,
  error,
  onSelect,
}: WalletAmountListProps) => {
  if (loading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={COLORS.primary.main} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={32} color={COLORS.semantic.error} />
        <Text style={styles.errorText}>Error al cargar los montos disponibles.</Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      {products.map((product) => (
        <WalletAmountCard
          key={product.id}
          product={product}
          selected={selected?.id === product.id}
          onPress={() => onSelect(product)}
        />
      ))}
    </View>
  );
};

export default WalletAmountList;

const styles = StyleSheet.create({
  list: {
    gap: SPACING.sm,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xxxl,
    gap: SPACING.sm,
  },
  errorText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.semantic.error,
    textAlign: "center",
  },
});
