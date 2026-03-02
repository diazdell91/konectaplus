import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { FONT_FAMILIES } from "@/theme/typography";

const HORIZONTAL_PADDING = 16;
const GAP = 10;
const NUM_COLUMNS = 3;
const CARD_HEIGHT = 158;

const services = [
  {
    key: "recharges",
    title: "Recargas",
    color: "#4DA3FF",
    icon: "cash-outline" as const,
  },
  {
    key: "calls",
    title: "Llamadas",
    color: "#4ED173",
    icon: "call-outline" as const,
  },
  {
    key: "messages",
    title: "Mensajes",
    color: "#B07CFF",
    icon: "chatbubble-ellipses-outline" as const,
  },
];

interface ServicesGridProps {
  onPressService?: (key: string) => void;
}

const ServicesGrid = ({ onPressService }: ServicesGridProps) => {
  const { width } = useWindowDimensions();

  const totalGaps = GAP * (NUM_COLUMNS - 1);
  const cardWidth =
    (width - HORIZONTAL_PADDING * 2 - totalGaps) / NUM_COLUMNS;

  const handlePress = (key: string) => {
    if (onPressService) {
      onPressService(key);
    } else {
      console.log(key);
    }
  };

  return (
    <View style={[styles.container, { paddingHorizontal: HORIZONTAL_PADDING }]}>
      <Text style={styles.sectionTitle}>Servicios</Text>
      <View style={styles.row}>
        {services.map((service) => (
          <Pressable
            key={service.key}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: service.color, width: cardWidth, height: CARD_HEIGHT },
              pressed && styles.cardPressed,
            ]}
            onPress={() => handlePress(service.key)}
          >
            {/* Decorative blob top-left */}
            <View style={styles.blobWrapper} pointerEvents="none">
              <View style={styles.blobOuter} />
              <Text style={styles.blobPlus}>+</Text>
            </View>

            {/* Icon */}
            <View style={styles.iconWrapper}>
              <Ionicons name={service.icon} size={52} color="rgba(255,255,255,0.95)" />
            </View>

            {/* Label */}
            <Text style={styles.cardLabel}>{service.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default ServicesGrid;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 26,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    gap: GAP,
  },
  card: {
    borderRadius: 28,
    overflow: "hidden",
    padding: 14,
    justifyContent: "flex-end",
    alignItems: "center",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    // Android shadow
    elevation: 5,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  blobWrapper: {
    position: "absolute",
    top: -28,
    left: -28,
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  blobOuter: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  blobPlus: {
    fontSize: 28,
    fontWeight: "300",
    color: "rgba(255,255,255,0.30)",
    lineHeight: 32,
    marginTop: 18,
    marginLeft: 18,
  },
  iconWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 6,
    letterSpacing: 0.2,
  },
});
