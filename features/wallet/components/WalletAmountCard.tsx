import { Text } from "@/components/ui";
import { WalletTopupProduct } from "@/graphql/walletTopupProducts";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface WalletAmountCardProps {
  product: WalletTopupProduct;
  selected: boolean;
  onPress: () => void;
}

const WalletAmountCard = ({ product, selected, onPress }: WalletAmountCardProps) => {
  const hasFee = product.feeCents > 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={[styles.checkCircle, selected && styles.checkCircleSelected]}>
        {selected && <Ionicons name="checkmark" size={14} color="#fff" />}
      </View>

      <View style={styles.center}>
        <Text style={[styles.amount, selected && styles.amountSelected]}>
          {formatUsd(product.amountCents)}
        </Text>
        <Text style={[styles.subtitle, selected && styles.subtitleSelected]}>
          Se acreditan a tu wallet
        </Text>
      </View>

      <View style={styles.right}>
        {hasFee ? (
          <>
            <Text style={[styles.price, selected && styles.priceSelected]}>
              {formatUsd(product.priceCents)}
            </Text>
            <Text style={styles.feeLabel}>+{formatUsd(product.feeCents)} cargo</Text>
          </>
        ) : (
          <View style={[styles.noFeeBadge, selected && styles.noFeeBadgeSelected]}>
            <Text style={styles.noFeeText}>Sin cargo</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default WalletAmountCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border.light,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 14,
  },
  cardSelected: {
    borderColor: COLORS.primary.main,
    backgroundColor: COLORS.primary.tint,
  },
  cardPressed: {
    opacity: 0.75,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border.light,
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircleSelected: {
    borderColor: COLORS.primary.main,
    backgroundColor: COLORS.primary.main,
  },
  center: {
    flex: 1,
    gap: 2,
  },
  amount: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
    color: COLORS.text.primary,
    letterSpacing: -0.3,
  },
  amountSelected: {
    color: COLORS.primary.main,
  },
  subtitle: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  subtitleSelected: {
    color: COLORS.primary.main + "AA",
  },
  right: {
    alignItems: "flex-end",
    gap: 2,
  },
  price: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  priceSelected: {
    color: COLORS.primary.main,
  },
  feeLabel: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 11,
    color: COLORS.text.secondary,
  },
  noFeeBadge: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  noFeeBadgeSelected: {
    backgroundColor: COLORS.primary.main + "20",
  },
  noFeeText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary.main,
  },
});
