import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SecureBadgeRow = () => (
  <View style={styles.root}>
    {/* Lock + encryption text */}
    <View style={styles.lockRow}>
      <Ionicons name="lock-closed" size={13} color={COLORS.primary.main} />
      <Text style={styles.lockText}>
        Cifrado seguro con SSL 256-bit · No almacenamos tu número de tarjeta
      </Text>
    </View>

    {/* Stripe + PCI badges */}
    <View style={styles.badgeRow}>
      <View style={styles.badge}>
        <Ionicons name="card-outline" size={11} color={COLORS.text.secondary} />
        <Text style={styles.badgeText}>Procesado por Stripe</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.badge}>
        <Ionicons
          name="shield-checkmark-outline"
          size={11}
          color={COLORS.text.secondary}
        />
        <Text style={styles.badgeText}>PCI DSS Level 1</Text>
      </View>
    </View>
  </View>
);

export default SecureBadgeRow;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    gap: 8,
    paddingTop: 12,
  },
  lockRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
  },
  lockText: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 11,
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: 16,
    flex: 1,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 11,
    fontWeight: "500",
    color: COLORS.text.secondary,
  },
  separator: {
    width: 1,
    height: 10,
    backgroundColor: COLORS.border.light,
  },
});
