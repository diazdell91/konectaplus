import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface OrderDetailHeroProps {
  statusLabel: string;
  statusColor: string;
  statusIcon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  totalAmountCents: number;
  serviceLabel: string;
}

const OrderDetailHero = ({
  statusLabel,
  statusColor,
  statusIcon,
  totalAmountCents,
  serviceLabel,
}: OrderDetailHeroProps) => (
  <View style={[styles.hero, { backgroundColor: `${statusColor}12` }]}>
    <MaterialCommunityIcons name={statusIcon} size={48} color={statusColor} />
    <Text style={[styles.statusLabel, { color: statusColor }]}>{statusLabel}</Text>
    <Text style={styles.amount}>{formatUsd(totalAmountCents)}</Text>
    <Text style={styles.service}>{serviceLabel}</Text>
  </View>
);

export default OrderDetailHero;

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 24,
    gap: 6,
    marginBottom: 8,
  },
  statusLabel: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  amount: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 36,
    lineHeight: 44,
    color: COLORS.text.primary,
    marginTop: 4,
  },
  service: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
  },
});
