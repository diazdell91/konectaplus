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
  const showBadge = item.badge && item.badge !== "NONE";

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
      {showBadge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText} numberOfLines={1}>
            {item.badge}
          </Text>
        </View>
      )}

      <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
        <Ionicons name={iconName} size={28} color={iconColor} />
      </View>

      <Text style={styles.label} numberOfLines={2}>
        {item.title}
      </Text>

      {!!item.subtitle && (
        <Text style={styles.subtitle} numberOfLines={2}>
          {item.subtitle}
        </Text>
      )}
    </AnimatedPressable>
  );
};

// ─────────────────────────────────────────────
// Skeleton
// ─────────────────────────────────────────────

const SkeletonCard = ({ width }: { width: number }) => (
  <View style={[styles.card, styles.skeleton, { width }]}>
    <View style={styles.skeletonBadge} />
    <View style={styles.skeletonIcon} />
    <View style={styles.skeletonLabelPrimary} />
    <View style={styles.skeletonLabelSecondary} />
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
  const cols = screenWidth >= 900 ? 4 : screenWidth >= 640 ? 3 : 2;

  const totalGaps = GAP * (cols - 1);
  const cardWidth = (screenWidth - H_PAD * 2 - totalGaps) / cols;

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
          ? Array.from({ length: cols * 2 }).map((_, i) => (
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
    minHeight: 136,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    backgroundColor: COLORS.surface.primary,
    justifyContent: "flex-start",
    gap: SPACING.xs,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.primary.tint,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 2,
    paddingHorizontal: SPACING.xs + 2,
    borderWidth: 1,
    borderColor: COLORS.primary.main + "33",
  },
  badgeText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary.main,
    fontWeight: "600",
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    marginTop: 2,
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: FONT_SIZES.base,
    fontWeight: "600",
    color: COLORS.text.primary,
    lineHeight: 18,
  },
  subtitle: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    lineHeight: 17,
  },

  skeleton: {
    opacity: 1,
  },
  skeletonBadge: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
    width: 54,
    height: 18,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.neutral.gray100,
  },
  skeletonIcon: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.neutral.gray100,
  },
  skeletonLabelPrimary: {
    width: "78%",
    height: 12,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.neutral.gray100,
  },
  skeletonLabelSecondary: {
    width: "62%",
    height: 10,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.neutral.gray100,
  },
});
