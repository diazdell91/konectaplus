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
import COLORS from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";

interface Promotion {
  id: string;
  operator: string;
  country: string;
  title: string;
  description: string;
  image: string;
  flag: string;
}

const promotions: Promotion[] = [
  {
    id: "1",
    operator: "Telcel",
    country: "México",
    title: "Paquete Amigo",
    description:
      "Obtén 1.5 GB, Llamadas, SMS y Redes sociales por 15 días, sin límites.",
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&h=300&fit=crop",
    flag: "🇲🇽",
  },
  {
    id: "2",
    operator: "Claro",
    country: "República Dominicana",
    title: "Recarga 300 DOP",
    description: "Saldo para lo que quieras.",
    image: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=400&h=300&fit=crop",
    flag: "🇩🇴",
  },
  {
    id: "3",
    operator: "AT&T",
    country: "México",
    title: "Recarga 200 MXN",
    description:
      "Obtén Llamadas y SMS ilimitados a México y Estados Unidos, 3.5 GB de datos.",
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400&h=300&fit=crop",
    flag: "🇲🇽",
  },
];

interface FeaturedPromotionsSectionProps {
  onPressPromotion?: (promotionId: string) => void;
}

const FeaturedPromotionsSection = ({
  onPressPromotion,
}: FeaturedPromotionsSectionProps) => {
  const handlePress = (id: string) => {
    if (onPressPromotion) {
      onPressPromotion(id);
    } else {
      console.log(id);
    }
  };

  const renderItem = ({ item }: { item: Promotion }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => handlePress(item.id)}
    >
      {/* Left image */}
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        contentFit="cover"
      />

      {/* Center content */}
      <View style={styles.cardBody}>
        {/* Operator · Country */}
        <View style={styles.operatorRow}>
          <Text style={styles.operatorText}>{item.operator}</Text>
          <Text style={styles.operatorDot}> • </Text>
          <Text style={styles.countryText} numberOfLines={1}>{item.country}</Text>
        </View>

        {/* Title */}
        <Text style={styles.promoTitle} numberOfLines={1}>
          {item.title}
        </Text>

        {/* Description */}
        <Text style={styles.promoDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>

      {/* Right side */}
      <View style={styles.cardRight}>
        <Text style={styles.flagEmoji}>{item.flag}</Text>
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
  flagEmoji: {
    fontSize: 22,
  },
});
