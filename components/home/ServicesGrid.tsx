import { Text } from "@/components/ui";
import {
  SERVICE_CATEGORIES,
  ServiceCategoriesData,
  ServiceItem,
} from "@/graphql/serviceCategories";
import { COLORS } from "@/theme/colors";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";

const HORIZONTAL_PADDING = 16;
const GAP = 10;
const NUM_COLUMNS = 3;
const CARD_HEIGHT = 158;

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const ICON_MAP: Record<string, IoniconName> = {
  TOPUP_MOBILE: "phone-portrait-outline",
  TOPUP_NAUTA: "mail-outline",
  TOPUP_WALLET: "wallet-outline",
  SHIPMENTS: "cube-outline",
  GIFT_CARD: "gift-outline",
};

const COLOR_MAP: Record<string, string> = {
  TOPUP_MOBILE: "#4DA3FF",
  TOPUP_NAUTA: "#4ED173",
  TOPUP_WALLET: "#B07CFF",
  SHIPMENTS: "#FF830C",
  GIFT_CARD: "#F59E0B",
};

// Map backend iconName values to Ionicons names
const BACKEND_ICON_MAP: Record<string, IoniconName> = {
  phone: "phone-portrait-outline",
  mail: "mail-outline",
  wallet: "wallet-outline",
  cube: "cube-outline",
  gift: "gift-outline",
};

const FALLBACK_ICON: IoniconName = "apps-outline";
const FALLBACK_COLOR = "#9AA5B4";

function resolveIcon(item: ServiceItem): IoniconName {
  return ICON_MAP[item.key] ?? BACKEND_ICON_MAP[item.iconName] ?? FALLBACK_ICON;
}

interface ServicesGridProps {
  onPressService?: (key: string) => void;
}

const ServicesGrid = ({ onPressService }: ServicesGridProps) => {
  const { width } = useWindowDimensions();

  const totalGaps = GAP * (NUM_COLUMNS - 1);
  const cardWidth = (width - HORIZONTAL_PADDING * 2 - totalGaps) / NUM_COLUMNS;

  const { data, loading, error } = useQuery<ServiceCategoriesData>(
    SERVICE_CATEGORIES,
    { fetchPolicy: "cache-and-network" },
  );

  if (__DEV__ && error) {
    console.warn("[ServicesGrid] query error:", error.message);
  }

  const items = useMemo<ServiceItem[]>(() => {
    if (!data?.serviceCategories) return [];
    return data.serviceCategories
      .flatMap((cat) => cat.items)
      .sort((a, b) => b.priority - a.priority);
  }, [data]);

  const handlePress = (item: ServiceItem) => {
    console.log("first");
    if (onPressService) {
      console.log(item.key);
      onPressService(item.key);
    } else {
      router.push(item.route as never);
    }
  };

  // Mostrar skeleton solo en la primera carga (sin datos en cache y sin error)
  const showSkeleton = loading && items.length === 0 && !error;

  return (
    <View style={[styles.container, { paddingHorizontal: HORIZONTAL_PADDING }]}>
      <Text h4 style={styles.sectionTitle}>
        Servicios
      </Text>
      <View style={styles.row}>
        {showSkeleton
          ? Array.from({ length: NUM_COLUMNS }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.skeletonCard,
                  { width: cardWidth, height: CARD_HEIGHT },
                ]}
              />
            ))
          : (error || items.length === 0) && !loading
            ? null
            : items.map((item) => (
                <Pressable
                  key={item.id}
                  style={({ pressed }) => [
                    styles.card,
                    {
                      backgroundColor: COLOR_MAP[item.key] ?? FALLBACK_COLOR,
                      width: cardWidth,
                      height: CARD_HEIGHT,
                    },
                    pressed && styles.cardPressed,
                  ]}
                  onPress={() => handlePress(item)}
                >
                  {/* Decorative blob top-left */}
                  <View style={styles.blobWrapper} pointerEvents="none">
                    <View style={styles.blobOuter} />
                    <Text style={styles.blobPlus}>+</Text>
                  </View>

                  {/* Icon */}
                  <View style={styles.iconWrapper}>
                    <Ionicons
                      name={resolveIcon(item)}
                      size={52}
                      color="rgba(255,255,255,0.95)"
                    />
                  </View>

                  {/* Label */}
                  <Text style={styles.cardLabel}>{item.title}</Text>
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
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
  },
  skeletonCard: {
    borderRadius: 28,
    backgroundColor: COLORS.neutral.gray100,
  },
  card: {
    borderRadius: 28,
    overflow: "hidden",
    padding: 14,
    justifyContent: "flex-end",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
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
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 6,
    letterSpacing: 0.2,
  },
});
