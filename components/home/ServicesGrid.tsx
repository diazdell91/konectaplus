import { Text } from "@/components/ui";
import {
  SERVICE_CATEGORIES,
  ServiceCategoriesData,
  ServiceItem,
} from "@/graphql/serviceCategories";
import { COLORS } from "@/theme/colors";
import { BORDER_RADIUS, FONT_FAMILIES, FONT_SIZES, SPACING } from "@/theme";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────

const H_PAD     = SPACING.component.screenPadding;
const GAP       = SPACING.sm;
const COLS      = 4;

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

// Icon per service key
const ICON_MAP: Record<string, IoniconName> = {
  TOPUP_MOBILE: "phone-portrait-outline",
  TOPUP_NAUTA:  "mail-outline",
  TOPUP_WALLET: "wallet-outline",
  SHIPMENTS:    "cube-outline",
  GIFT_CARD:    "gift-outline",
};

// Fallback from backend iconName field
const BACKEND_ICON_MAP: Record<string, IoniconName> = {
  phone:  "phone-portrait-outline",
  mail:   "mail-outline",
  wallet: "wallet-outline",
  cube:   "cube-outline",
  gift:   "gift-outline",
};

// Icon container color per service (icon color + soft bg)
const SERVICE_COLORS: Record<string, { icon: string; bg: string }> = {
  TOPUP_MOBILE: { icon: COLORS.primary.main,   bg: COLORS.primary.tint  },
  TOPUP_NAUTA:  { icon: "#10B981",              bg: "#ECFDF5"            },
  TOPUP_WALLET: { icon: COLORS.accent.premium,  bg: COLORS.accent.premiumSoft },
  SHIPMENTS:    { icon: COLORS.accent.main,     bg: COLORS.accent.soft   },
  GIFT_CARD:    { icon: "#F59E0B",              bg: "#FFFBEB"            },
};

const FALLBACK_COLORS = {
  icon: COLORS.neutral.gray400,
  bg:   COLORS.neutral.gray100,
};

const FALLBACK_ICON: IoniconName = "apps-outline";

function resolveIcon(item: ServiceItem): IoniconName {
  return ICON_MAP[item.key] ?? BACKEND_ICON_MAP[item.iconName] ?? FALLBACK_ICON;
}

function resolveColors(item: ServiceItem) {
  return SERVICE_COLORS[item.key] ?? FALLBACK_COLORS;
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

interface ServiceCardProps {
  item: ServiceItem;
  width: number;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ServiceCard = ({ item, width, onPress }: ServiceCardProps) => {
  const { icon: iconColor, bg: iconBg } = resolveColors(item);
  const iconName = resolveIcon(item);
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[styles.card, { width }, animStyle]}
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.93, { damping: 18, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 150 });
      }}
    >
      {/* Icon container — Regla del Icon Container */}
      <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
        <Ionicons name={iconName} size={24} color={iconColor} />
      </View>

      {/* Label */}
      <Text style={styles.label} numberOfLines={2}>
        {item.title}
      </Text>
    </AnimatedPressable>
  );
};

// ─────────────────────────────────────────────
// Skeleton
// ─────────────────────────────────────────────

const SkeletonCard = ({ width }: { width: number }) => (
  <View style={[styles.card, styles.skeleton, { width }]}>
    <View style={styles.skeletonIcon} />
    <View style={styles.skeletonLabel} />
  </View>
);

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

interface ServicesGridProps {
  onPressService?: (key: string) => void;
}

const ServicesGrid = ({ onPressService }: ServicesGridProps) => {
  const { width: screenWidth } = useWindowDimensions();

  const totalGaps = GAP * (COLS - 1);
  const cardWidth = (screenWidth - H_PAD * 2 - totalGaps) / COLS;

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

  const showSkeleton = loading && items.length === 0 && !error;
  const showItems    = !showSkeleton && items.length > 0;

  return (
    <View style={styles.container}>
      <Text h4 style={styles.sectionTitle}>
        Servicios
      </Text>

      <View style={styles.grid}>
        {showSkeleton
          ? Array.from({ length: COLS }).map((_, i) => (
              <SkeletonCard key={i} width={cardWidth} />
            ))
          : showItems
            ? items.map((item) => (
                <ServiceCard
                  key={item.id}
                  item={item}
                  width={cardWidth}
                  onPress={() =>
                    onPressService
                      ? onPressService(item.key)
                      : router.push(item.route as never)
                  }
                />
              ))
            : null}
      </View>
    </View>
  );
};

export default ServicesGrid;

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: H_PAD,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
  },

  // Card
  card: {
    alignItems: "center",
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,
  },

  // Icon container
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
  },

  // Label
  label: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: FONT_SIZES.xs,
    fontWeight: "500",
    color: COLORS.text.primary,
    textAlign: "center",
    lineHeight: 14,
  },

  // Skeleton
  skeleton: {
    opacity: 1,
  },
  skeletonIcon: {
    width: 52,
    height: 52,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.neutral.gray100,
  },
  skeletonLabel: {
    width: 40,
    height: 8,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.neutral.gray100,
  },
});
