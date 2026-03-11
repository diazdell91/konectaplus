import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Text } from "@/components/ui";
import COLORS from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";

const HORIZONTAL_PADDING = 16;
const COLUMN_GAP = 10;

interface Offer {
  id: string;
  title: string;
  description: string;
  operator: string;
  country: string;
  image: string;
  flag: string;
}

const offers: Offer[] = [
  {
    id: "1",
    title: "Paquete Amigo Sin Límites",
    description: "500 MB de Datos, Llamadas, SMS y WhatsApp ilimitados.",
    operator: "Telcel",
    country: "México",
    image:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&h=300&fit=crop",
    flag: "🇲🇽",
  },
  {
    id: "2",
    title: "Super Paquete 7 GB",
    description: "7 GB de Datos (Internet), WhatsApp y Facebook ilimitados.",
    operator: "Claro",
    country: "Nicaragua",
    image:
      "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=400&h=300&fit=crop",
    flag: "🇳🇮",
  },
  {
    id: "3",
    title: "Super Paquete 20 GB",
    description: "20 GB de Datos, WhatsApp, Facebook e Instagram.",
    operator: "Claro",
    country: "Guatemala",
    image:
      "https://images.unsplash.com/photo-1591017403286-fd8493524e1e?w=400&h=300&fit=crop",
    flag: "🇬🇹",
  },
  {
    id: "4",
    title: "Super Paquete 7 GB",
    description: "7 GB de Datos, WhatsApp y Facebook Ilimitados.",
    operator: "Claro",
    country: "El Salvador",
    image:
      "https://images.unsplash.com/photo-1564959130747-897fb406b9af?w=400&h=300&fit=crop",
    flag: "🇸🇻",
  },
];

interface SpecialOffersSectionProps {
  onPressOffer?: (offerId: string) => void;
}

const SpecialOffersSection = ({ onPressOffer }: SpecialOffersSectionProps) => {
  const { width } = useWindowDimensions();
  const cardWidth =
    (width - HORIZONTAL_PADDING * 2 - COLUMN_GAP) / 2;

  const handlePress = (id: string) => {
    if (onPressOffer) {
      onPressOffer(id);
    } else {
      console.log(id);
    }
  };

  const renderItem = ({ item }: { item: Offer }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { width: cardWidth },
        pressed && styles.cardPressed,
      ]}
      onPress={() => handlePress(item.id)}
    >
      {/* Top image */}
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        contentFit="cover"
      />

      {/* Content area */}
      <View style={styles.cardContent}>
        <Text style={styles.offerTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text
          style={styles.offerDescription}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.description}
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.footerLeft}>
          <Text style={styles.flagEmoji}>{item.flag}</Text>
          <View style={styles.footerTextGroup}>
            <Text style={styles.operatorText} numberOfLines={1}>
              {item.operator}
            </Text>
            <Text style={styles.countryText} numberOfLines={1}>
              {item.country}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#C0C8D2" />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text h4 style={styles.sectionTitle}>Ofertas especiales</Text>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.columnWrapper}
        ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
      />
    </View>
  );
};

export default SpecialOffersSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 24,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  sectionTitle: {
    marginBottom: 14,
  },
  columnWrapper: {
    gap: COLUMN_GAP,
  },
  rowSeparator: {
    height: COLUMN_GAP,
  },
  card: {
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
    transform: [{ scale: 0.97 }],
  },
  cardImage: {
    width: "100%",
    height: 130,
  },
  cardContent: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 8,
    gap: 4,
    flex: 1,
  },
  offerTitle: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text.primary,
    lineHeight: 21,
  },
  offerDescription: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0F2F5",
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  flagEmoji: {
    fontSize: 18,
  },
  footerTextGroup: {
    flex: 1,
  },
  operatorText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  countryText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 11,
    color: COLORS.text.secondary,
  },
});
