import { Button, Text } from "@/components/ui";
import {
  WALLET_TOPUP_PRODUCTS,
  WalletTopupProduct,
  WalletTopupProductsData,
} from "@/graphql/walletTopupProducts";
import { MY_WALLET_USD, MyWalletUSDData } from "@/graphql/myWallet";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import { formatUsd } from "@/utils/currency";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ---------------------------------------------------------------------------
// Amount card
// ---------------------------------------------------------------------------

interface AmountCardProps {
  product: WalletTopupProduct;
  selected: boolean;
  onPress: () => void;
}

function AmountCard({ product, selected, onPress }: AmountCardProps) {
  const hasFee = product.feeCents > 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.amountCard,
        selected && styles.amountCardSelected,
        pressed && styles.amountCardPressed,
      ]}
    >
      <View style={[styles.checkCircle, selected && styles.checkCircleSelected]}>
        {selected && <Ionicons name="checkmark" size={14} color="#fff" />}
      </View>

      <View style={styles.amountCardCenter}>
        <Text style={[styles.amountValue, selected && styles.amountValueSelected]}>
          {formatUsd(product.amountCents)}
        </Text>
        <Text style={[styles.amountSubtitle, selected && styles.amountSubtitleSelected]}>
          Se acreditan a tu wallet
        </Text>
      </View>

      <View style={styles.amountCardRight}>
        {hasFee ? (
          <>
            <Text style={[styles.priceValue, selected && styles.priceValueSelected]}>
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
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export default function WalletTopupScreen() {
  const [selected, setSelected] = useState<WalletTopupProduct | null>(null);

  const { data: productsData, loading, error } = useQuery<WalletTopupProductsData>(
    WALLET_TOPUP_PRODUCTS,
    { fetchPolicy: "cache-and-network" },
  );

  const { data: walletData } = useQuery<MyWalletUSDData>(MY_WALLET_USD, {
    fetchPolicy: "cache-and-network",
  });

  const products = (productsData?.walletTopupProducts ?? []).filter((p) => p.isActive);
  const balance = walletData?.myWalletUSD?.balanceCachedCents ?? null;

  const handleContinue = () => {
    if (!selected) return;
    router.push({
      pathname: "/services/wallet/topup-confirm",
      params: {
        productId: selected.productId,
        amountCents: String(selected.amountCents),
        priceCents: String(selected.priceCents),
        feeCents: String(selected.feeCents),
      },
    });
  };

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero: saldo actual */}
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="wallet-outline" size={28} color={COLORS.primary.main} />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.heroLabel}>Saldo actual</Text>
            <Text style={styles.heroBalance}>
              {balance !== null ? formatUsd(balance) : "—"}
            </Text>
          </View>
        </View>

        {/* Section label */}
        <Text style={styles.sectionLabel}>Selecciona el monto</Text>

        {/* Products */}
        {loading && products.length === 0 ? (
          <View style={styles.centered}>
            <ActivityIndicator color={COLORS.primary.main} />
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <Ionicons name="alert-circle-outline" size={32} color={COLORS.semantic.error} />
            <Text style={styles.errorText}>Error al cargar los montos disponibles.</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {products.map((product) => (
              <AmountCard
                key={product.id}
                product={product}
                selected={selected?.id === product.id}
                onPress={() => setSelected(product)}
              />
            ))}
          </View>
        )}

        {/* Cost summary */}
        {selected && (
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Saldo a recibir</Text>
              <Text style={styles.summaryValue}>{formatUsd(selected.amountCents)}</Text>
            </View>
            {selected.feeCents > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Cargo por servicio</Text>
                <Text style={styles.summaryValue}>{formatUsd(selected.feeCents)}</Text>
              </View>
            )}
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotal}>Total a pagar</Text>
              <Text style={styles.summaryTotalValue}>{formatUsd(selected.priceCents)}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <Button
          variant="primary"
          title={
            selected
              ? `Continuar · ${formatUsd(selected.priceCents)}`
              : "Selecciona un monto"
          }
          onPress={handleContinue}
          disabled={selected === null}
        />
      </View>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

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

  // Hero
  hero: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 14,
  },
  heroIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#EAF7F5",
    alignItems: "center",
    justifyContent: "center",
  },
  heroText: {
    flex: 1,
    gap: 2,
  },
  heroLabel: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.text.secondary,
  },
  heroBalance: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text.primary,
    letterSpacing: -0.5,
  },

  // Section label
  sectionLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },

  // List
  list: {
    gap: SPACING.sm,
  },

  // Amount card
  amountCard: {
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
  amountCardSelected: {
    borderColor: COLORS.primary.main,
    backgroundColor: "#EAF7F5",
  },
  amountCardPressed: {
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
  amountCardCenter: {
    flex: 1,
    gap: 2,
  },
  amountValue: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text.primary,
    letterSpacing: -0.3,
  },
  amountValueSelected: {
    color: COLORS.primary.main,
  },
  amountSubtitle: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  amountSubtitleSelected: {
    color: COLORS.primary.main + "AA",
  },
  amountCardRight: {
    alignItems: "flex-end",
    gap: 2,
  },
  priceValue: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  priceValueSelected: {
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

  // Summary
  summary: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  summaryLabel: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  summaryValue: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.border.light,
  },
  summaryTotal: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  summaryTotalValue: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary.main,
  },

  // States
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

  // Footer
  footer: {
    paddingHorizontal: SPACING.component.screenPadding,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
    backgroundColor: COLORS.surface.primary,
  },
});
