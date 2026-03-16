import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "@/components/ui";
import { getFlagSource } from "@/constants/phoneCountries";
import { PromotionListing } from "@/graphql/promotionListings";
import COLORS from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";

interface FeaturedPromotionsSectionProps {
  items?: PromotionListing[];
  onPressPromotion?: (promotion: PromotionListing) => void;
}

const FeaturedPromotionsSection = ({
  items,
  onPressPromotion,
}: FeaturedPromotionsSectionProps) => {
  const handlePress = (promotion: PromotionListing) => {
    if (onPressPromotion) {
      onPressPromotion(promotion);
    } else {
      console.log(promotion.id);
    }
  };

  const promotions = items ?? [];

  if (promotions.length === 0) {
    return null;
  }

  const renderItem = ({ item }: { item: PromotionListing }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => handlePress(item)}
    >
      {/* Left image */}
      <Image
        source={{ uri: item.imageUrl ?? "" }}
        style={styles.cardImage}
        contentFit="cover"
      />

      {/* Center content */}
      <View style={styles.cardBody}>
        {/* Operator · Country */}
        <View style={styles.operatorRow}>
          <Text style={styles.operatorText}>
            {item.name ?? item.providerCode ?? "Operador"}
          </Text>
          <Text style={styles.operatorDot}> • </Text>
          {item.countryIso && getFlagSource(item.countryIso) ? (
            <Image
              source={getFlagSource(item.countryIso)}
              style={styles.countryFlag}
              contentFit="cover"
            />
          ) : (
            <Text style={styles.countryText} numberOfLines={1}>--</Text>
          )}
        </View>

        {/* Title */}
        <Text style={styles.promoTitle} numberOfLines={1}>
          {item.title}
        </Text>

        {/* Description */}
        <Text style={styles.promoDescription} numberOfLines={2}>
          {item.subtitle ?? "Promoción disponible por tiempo limitado."}
        </Text>
      </View>

      {/* Right side */}
      <View style={styles.cardRight}>
        {item.badge ? (
          <Text style={styles.badgeText} numberOfLines={1}>{item.badge}</Text>
        ) : null}
        <Ionicons name="chevron-forward" size={18} color="#C0C8D2" />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text h4 style={styles.sectionTitle}>Promociones destacadas</Text>
      <FlatList
        data={promotions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default FeaturedPromotionsSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginBottom: 14,
  },
  separator: {
    height: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // Android shadow
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  cardImage: {
    width: 110,
    height: 100,
    // left corners rounded via container's borderRadius + overflow hidden
  },
  cardBody: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 4,
  },
  operatorRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  operatorText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  operatorDot: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  countryText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
    flexShrink: 1,
  },
  countryFlag: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  promoTitle: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text.primary,
    marginTop: 2,
  },
  promoDescription: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
  cardRight: {
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingVertical: 14,
  },
  badgeText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 12,
    color: COLORS.primary.main,
    textAlign: "center",
  },
});
