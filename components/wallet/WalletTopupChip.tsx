import { WalletTopupProduct } from "@/graphql/walletTopupProducts";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  product: WalletTopupProduct;
  selected: boolean;
  onPress: () => void;
}

const WalletTopupChip = ({ product, selected, onPress }: Props) => {
  const hasFee = product.feeCents > 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.chipPressed,
      ]}
    >
      <Text style={[styles.amount, selected && styles.amountSelected]}>
        {formatUsd(product.amountCents)}
      </Text>
      {hasFee ? (
        <Text style={[styles.price, selected && styles.priceSelected]}>
          Pagas {formatUsd(product.priceCents)}
        </Text>
      ) : (
        <View style={styles.freeBadge}>
          <Text style={styles.freeBadgeText}>Sin cargo</Text>
        </View>
      )}
    </Pressable>
  );
};

export default WalletTopupChip;

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1.5,
    borderColor: COLORS.border.light,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    minWidth: 90,
    gap: 4,
  },
  chipSelected: {
    borderColor: COLORS.primary.main,
    backgroundColor: COLORS.primary.tint,
  },
  chipPressed: {
    opacity: 0.7,
  },
  amount: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
  amountSelected: {
    color: COLORS.primary.main,
  },
  price: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 11,
    color: COLORS.text.secondary,
  },
  priceSelected: {
    color: COLORS.primary.main,
  },
  freeBadge: {
    backgroundColor: COLORS.primary.main,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  freeBadgeText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
  },
});
