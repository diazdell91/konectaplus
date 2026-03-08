/**
 * OfferList
 *
 * FlatList of TopupProduct cards filtered by topupType.
 *
 * Sort order:
 *   1. isFeatured DESC
 *   2. priority ASC
 *   3. sellPriceUsdCents ASC
 */

import {
  TopupListingType,
  TopupProduct,
} from "@/graphql/adminTopupProductListings";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { discountPercent, formatUsd } from "@/utils/currency";
import { ApolloError } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface Props {
  products: TopupProduct[];
  topupType: TopupListingType;
  selectedProductId: string | null;
  onSelectProduct: (product: TopupProduct) => void;
  loading?: boolean;
  error?: ApolloError;
  onRetry?: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sortProducts(items: TopupProduct[]): TopupProduct[] {
  return [...items].sort((a, b) => {
    if (b.isFeatured !== a.isFeatured) return b.isFeatured ? 1 : -1;
    return a.sellPriceUsdCents - b.sellPriceUsdCents;
  });
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const BADGE_COLORS: Record<string, string> = {
  NEW: COLORS.primary.main,
  OFFER: COLORS.secondary.main,
  HOT: "#EF4444",
  POPULAR: "#8B5CF6",
};

const BADGE_LABELS: Record<string, string> = {
  NEW: "Nuevo",
  OFFER: "Oferta",
  HOT: "Hot",
  POPULAR: "Popular",
};

const BadgeChip = ({ label }: { label: string }) => {
  if (!label || label === "NONE") return null;
  const bg = BADGE_COLORS[label] ?? COLORS.neutral.gray400;
  const text = BADGE_LABELS[label] ?? label;
  return (
    <View style={[badgeStyles.chip, { backgroundColor: bg }]}>
      <Text style={badgeStyles.text}>{text}</Text>
    </View>
  );
};

const badgeStyles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginBottom: 4,
  },
  text: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.neutral.white,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
});

// ---------------------------------------------------------------------------
// Empty / error states
// ---------------------------------------------------------------------------

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name="sad-outline" size={40} color={COLORS.neutral.gray300} />
    <Text style={styles.emptyTitle}>Sin ofertas disponibles</Text>
    <Text style={styles.emptySubtitle}>
      No hay productos para este país / tipo.
    </Text>
  </View>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const OfferList = ({
  products,
  topupType,
  selectedProductId,
  onSelectProduct,
  loading,
  error,
  onRetry,
}: Props) => {
  const filtered = useMemo(
    () => sortProducts(products.filter((p) => p.topupType === topupType)),
    [products, topupType],
  );

  if (loading && products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator color={COLORS.primary.main} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={36} color={COLORS.semantic.error} />
        <Text style={styles.emptyTitle}>Error al cargar</Text>
        {onRetry && (
          <Pressable style={styles.retryBtn} onPress={onRetry}>
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        )}
      </View>
    );
  }

  if (filtered.length === 0) {
    return <EmptyState />;
  }

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const isSelected = item.id === selectedProductId;
        const hasDiscount =
          !!item.compareAtPriceUsdCents &&
          item.compareAtPriceUsdCents > item.sellPriceUsdCents;
        const discount = hasDiscount
          ? discountPercent(
              item.sellPriceUsdCents,
              item.compareAtPriceUsdCents!,
            )
          : 0;

        return (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              isSelected && styles.cardSelected,
              pressed && styles.cardPressed,
            ]}
            onPress={() => onSelectProduct(item)}
            accessibilityRole="button"
            accessibilityLabel={item.displayName}
            accessibilityState={{ selected: isSelected }}
          >
            {/* Featured star */}
            {item.isFeatured && (
              <View style={styles.featuredBadge}>
                <Ionicons name="star" size={10} color={COLORS.neutral.white} />
                <Text style={styles.featuredText}>Destacado</Text>
              </View>
            )}

            {/* Badge */}
            {item.badge && <BadgeChip label={item.badge} />}

            <View style={styles.cardBody}>
              {/* Left: info */}
              <View style={styles.infoCol}>
                <Text style={styles.displayName} numberOfLines={2}>
                  {item.displayName}
                </Text>

                {!!item.description && (
                  <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                  </Text>
                )}

                {!!item.validityPeriod && (
                  <View style={styles.validityRow}>
                    <Ionicons
                      name="time-outline"
                      size={12}
                      color={COLORS.text.secondary}
                    />
                    <Text style={styles.validityText}>
                      Válido por {item.validityPeriod}
                    </Text>
                  </View>
                )}

                {!!item.product?.sendValue && !!item.product?.sendCurrency && (
                  <Text style={styles.receiveValue}>
                    Recibe: {item.product.sendValue} {item.product.sendCurrency}
                  </Text>
                )}
              </View>

              {/* Right: price */}
              <View style={styles.priceCol}>
                {hasDiscount && (
                  <>
                    <Text style={styles.comparePrice}>
                      {formatUsd(item.compareAtPriceUsdCents!)}
                    </Text>
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>-{discount}%</Text>
                    </View>
                  </>
                )}
                <Text style={styles.sellPrice}>
                  {formatUsd(item.sellPriceUsdCents)}
                </Text>
              </View>
            </View>

            {/* Selected indicator */}
            {isSelected && (
              <View style={styles.selectedIndicator}>
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color={COLORS.primary.main}
                />
              </View>
            )}
          </Pressable>
        );
      }}
    />
  );
};

export default OfferList;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 160, // space for fixed footer
    gap: 10,
  },

  // Card
  card: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border.light,
  },
  cardSelected: {
    borderColor: COLORS.primary.main,
    backgroundColor: "#EAF7F5",
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },

  // Featured
  featuredBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: COLORS.secondary.light,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginBottom: 6,
    gap: 4,
  },
  featuredText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.neutral.white,
  },

  // Info column
  infoCol: {
    flex: 1,
    gap: 3,
  },
  displayName: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  description: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
    lineHeight: 17,
  },
  validityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 3,
  },
  validityText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 11,
    color: COLORS.text.secondary,
  },
  receiveValue: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.primary.main,
    marginTop: 2,
  },

  // Price column
  priceCol: {
    alignItems: "flex-end",
    gap: 2,
    minWidth: 72,
  },
  comparePrice: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 11,
    color: COLORS.neutral.gray400,
    textDecorationLine: "line-through",
  },
  discountBadge: {
    backgroundColor: COLORS.semantic.error,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  discountText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.neutral.white,
  },
  sellPrice: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text.primary,
  },

  // Selected check
  selectedIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
  },

  // Empty / error
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 32,
    gap: 10,
  },
  emptyTitle: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.primary,
    textAlign: "center",
  },
  emptySubtitle: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: 19,
  },
  retryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primary.main,
    marginTop: 4,
  },
  retryText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.neutral.white,
  },
});
