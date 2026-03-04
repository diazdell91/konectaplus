/**
 * OfferList
 *
 * FlatList of RechargeProductListing cards for a specific provider + type.
 *
 * Sort order:
 *   1. isFeatured DESC
 *   2. priority ASC
 *   3. sellPriceUsdCents ASC
 */

import {
  RechargeListingType,
  RechargeProductListing,
} from "@/graphql/adminRechargeProductListings";
import COLORS from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { discountPercent, formatUsd } from "@/utils/currency";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface Props {
  listings: RechargeProductListing[];
  providerCode: string | null;
  rechargeType: RechargeListingType;
  selectedListingId: string | null;
  onSelectListing: (listing: RechargeProductListing) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sortListings(items: RechargeProductListing[]): RechargeProductListing[] {
  return [...items].sort((a, b) => {
    if (b.isFeatured !== a.isFeatured) return b.isFeatured ? 1 : -1;
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.sellPriceUsdCents - b.sellPriceUsdCents;
  });
}


// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const BadgeChip = ({ label }: { label: string }) => {
  if (!label || label === "NONE") return null;
  return (
    <View style={badgeStyles.chip}>
      <Text style={badgeStyles.text}>{label}</Text>
    </View>
  );
};

const badgeStyles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.secondary.main,
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
// Empty / skeleton placeholders
// ---------------------------------------------------------------------------

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name="sad-outline" size={40} color={COLORS.neutral.gray300} />
    <Text style={styles.emptyTitle}>Sin ofertas disponibles</Text>
    <Text style={styles.emptySubtitle}>
      No hay productos para este país / proveedor / tipo.
    </Text>
  </View>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const OfferList = ({
  listings,
  providerCode,
  rechargeType,
  selectedListingId,
  onSelectListing,
}: Props) => {
  const filtered = useMemo(() => {
    if (!providerCode) return [];
    return sortListings(
      listings.filter(
        (l) =>
          l.providerCode === providerCode && l.rechargeType === rechargeType
      )
    );
  }, [listings, providerCode, rechargeType]);

  if (!providerCode) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="hand-left-outline" size={38} color={COLORS.neutral.gray300} />
        <Text style={styles.emptyTitle}>Selecciona un proveedor</Text>
        <Text style={styles.emptySubtitle}>
          Elige un proveedor arriba para ver las ofertas disponibles.
        </Text>
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
        const isSelected = item.id === selectedListingId;
        const hasDiscount =
          !!item.compareAtPriceUsdCents &&
          item.compareAtPriceUsdCents > item.sellPriceUsdCents;
        const discount = hasDiscount
          ? discountPercent(item.sellPriceUsdCents, item.compareAtPriceUsdCents!)
          : 0;

        return (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              isSelected && styles.cardSelected,
              pressed && styles.cardPressed,
            ]}
            onPress={() => onSelectListing(item)}
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

                {!!item.receiveValue && !!item.receiveCurrency && (
                  <Text style={styles.receiveValue}>
                    Recibe: {item.receiveValue} {item.receiveCurrency}
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

  // Empty
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
});
