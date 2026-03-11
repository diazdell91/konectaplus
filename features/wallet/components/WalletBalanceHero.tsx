import { Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { formatUsd } from "@/utils/currency";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface WalletBalanceHeroProps {
  balance: number | null;
}

const WalletBalanceHero = ({ balance }: WalletBalanceHeroProps) => (
  <View style={styles.hero}>
    <View style={styles.iconWrap}>
      <Ionicons name="wallet-outline" size={28} color={COLORS.primary.main} />
    </View>
    <View style={styles.text}>
      <Text style={styles.label}>Saldo actual</Text>
      <Text style={styles.balance}>
        {balance !== null ? formatUsd(balance) : "—"}
      </Text>
    </View>
  </View>
);

export default WalletBalanceHero;

const styles = StyleSheet.create({
  hero: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 14,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.primary.tint,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 13,
    color: COLORS.text.secondary,
  },
  balance: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 38,
    color: COLORS.text.primary,
    letterSpacing: -0.5,
  },
});
