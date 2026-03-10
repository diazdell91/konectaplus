import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CardNetwork = "visa" | "mastercard" | "amex" | "unknown";

interface Props {
  name: string;
  last4: string;
  expiry: string;
  showBack: boolean; // true when CVV field is focused
  network: CardNetwork;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function NetworkLabel({ network }: { network: CardNetwork }) {
  if (network === "visa") {
    return <Text style={networkStyles.visa}>VISA</Text>;
  }
  if (network === "mastercard") {
    return (
      <View style={networkStyles.mcWrap}>
        <View style={[networkStyles.mcCircle, { backgroundColor: "#EB001B" }]} />
        <View
          style={[
            networkStyles.mcCircle,
            { backgroundColor: "#F79E1B", marginLeft: -10 },
          ]}
        />
      </View>
    );
  }
  if (network === "amex") {
    return <Text style={networkStyles.amex}>AMEX</Text>;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const CardPreview = ({ name, last4, expiry, showBack, network }: Props) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(showBack ? 1 : 0, { duration: 420 });
  }, [showBack]);

  // Front face — visible when rotation < 0.5
  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 0.5, 1], [0, -90, -180]);
    const opacity = interpolate(rotation.value, [0, 0.45, 0.5], [1, 1, 0]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      opacity,
    };
  });

  // Back face — visible when rotation > 0.5
  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 0.5, 1], [180, 90, 0]);
    const opacity = interpolate(rotation.value, [0.5, 0.55, 1], [0, 1, 1]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      opacity,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  const displayNumber = last4
    ? `•••• •••• •••• ${last4}`
    : "•••• •••• •••• ••••";

  const displayExpiry = expiry || "MM/AA";
  const displayName = name || "NOMBRE APELLIDO";

  return (
    <View style={styles.wrapper}>
      {/* ── Front ── */}
      <Animated.View style={[styles.card, styles.front, frontStyle]}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={styles.chip}>
            <View style={styles.chipInner} />
          </View>
          <NetworkLabel network={network} />
        </View>

        {/* Card number */}
        <Text style={styles.number}>{displayNumber}</Text>

        {/* Bottom row */}
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.fieldLabel}>Titular</Text>
            <Text style={styles.fieldValue} numberOfLines={1}>
              {displayName.toUpperCase()}
            </Text>
          </View>
          <View style={styles.expiryBlock}>
            <Text style={styles.fieldLabel}>Vence</Text>
            <Text style={styles.fieldValue}>{displayExpiry}</Text>
          </View>
        </View>

        {/* Decorative circles */}
        <View style={[styles.circle, styles.circleTop]} />
        <View style={[styles.circle, styles.circleBottom]} />
      </Animated.View>

      {/* ── Back ── */}
      <Animated.View style={[styles.card, styles.back, backStyle]}>
        {/* Magnetic stripe */}
        <View style={styles.stripe} />

        {/* CVV area */}
        <View style={styles.cvvRow}>
          <View style={styles.cvvWhiteBar}>
            <Text style={styles.cvvDots}>•••</Text>
          </View>
          <Text style={styles.cvvLabel}>CVV</Text>
        </View>

        {/* Network bottom-right */}
        <View style={styles.backBottomRow}>
          <Text style={styles.backSecureText}>
            <Ionicons name="lock-closed" size={10} /> Secure
          </Text>
          <NetworkLabel network={network} />
        </View>

        {/* Decorative circles */}
        <View style={[styles.circle, styles.circleTop]} />
        <View style={[styles.circle, styles.circleBottom]} />
      </Animated.View>
    </View>
  );
};

export default CardPreview;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const CARD_BG = COLORS.primary.main;
const CARD_BG_DARK = COLORS.primary.dark;

const styles = StyleSheet.create({
  wrapper: {
    height: 190,
    marginBottom: 24,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 22,
    backgroundColor: CARD_BG,
    overflow: "hidden",
    shadowColor: CARD_BG_DARK,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  front: {},
  back: {},

  // ── Decorative circles ──
  circle: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  circleTop: {
    top: -50,
    right: -30,
  },
  circleBottom: {
    bottom: -70,
    left: -20,
  },

  // ── Front ──
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  chip: {
    width: 36,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#E8C96A",
    justifyContent: "center",
    alignItems: "center",
  },
  chipInner: {
    width: 20,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#C9A84C",
  },
  number: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 2.5,
    marginBottom: 20,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  fieldLabel: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 10,
    color: "rgba(255,255,255,0.65)",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  fieldValue: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    maxWidth: 180,
  },
  expiryBlock: {
    alignItems: "flex-end",
  },

  // ── Back ──
  stripe: {
    height: 44,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginHorizontal: -22,
    marginTop: -22,
    marginBottom: 20,
  },
  cvvRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  cvvWhiteBar: {
    flex: 1,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 12,
  },
  cvvDots: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 18,
    color: COLORS.text.primary,
    letterSpacing: 4,
  },
  cvvLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  backBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 22,
    left: 22,
    right: 22,
  },
  backSecureText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
  },
});

const networkStyles = StyleSheet.create({
  visa: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
    fontStyle: "italic",
  },
  amex: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  mcWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  mcCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    opacity: 0.9,
  },
});
