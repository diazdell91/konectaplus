import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, Text, View } from "react-native";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CardNetwork = "visa" | "mastercard" | "amex" | "unknown";

interface Props {
  network: CardNetwork;
}

// ---------------------------------------------------------------------------
// Network configs
// ---------------------------------------------------------------------------

const NETWORK_CONFIG: Record<
  Exclude<CardNetwork, "unknown">,
  { label: string; color: string; bg: string }
> = {
  visa: {
    label: "VISA",
    color: "#1A1F71",
    bg: "#EEF0FB",
  },
  mastercard: {
    label: "Mastercard",
    color: "#EB001B",
    bg: "#FEF0F0",
  },
  amex: {
    label: "Amex",
    color: "#007BC1",
    bg: "#EDF6FD",
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const CardTypeIndicator = ({ network }: Props) => {
  const scale = useSharedValue(1);

  // Pulse animation when network is detected
  React.useEffect(() => {
    if (network !== "unknown") {
      scale.value = withSequence(
        withTiming(1.12, { duration: 120 }),
        withTiming(1, { duration: 120 }),
      );
    }
  }, [network]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (network === "unknown") {
    return (
      <View style={styles.unknownWrap}>
        {(["visa", "mastercard", "amex"] as const).map((n) => (
          <View
            key={n}
            style={[styles.dot, { backgroundColor: NETWORK_CONFIG[n].color }]}
          />
        ))}
      </View>
    );
  }

  const config = NETWORK_CONFIG[network];

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={[styles.badge, { backgroundColor: config.bg }, animStyle]}
    >
      {network === "mastercard" ? (
        <MastercardDots />
      ) : (
        <Text style={[styles.label, { color: config.color }]}>
          {config.label}
        </Text>
      )}
    </Animated.View>
  );
};

export default CardTypeIndicator;

// ---------------------------------------------------------------------------
// Mastercard circles sub-component
// ---------------------------------------------------------------------------

function MastercardDots() {
  return (
    <View style={mc.wrap}>
      <View style={[mc.circle, { backgroundColor: "#EB001B" }]} />
      <View style={[mc.circle, { backgroundColor: "#F79E1B", marginLeft: -7 }]} />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  unknownWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    opacity: 0.25,
  },
});

const mc = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    opacity: 0.9,
  },
});
