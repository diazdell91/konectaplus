import { Text } from "@/components/ui";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

const WalletTopupConfirmHero = () => (
  <View>
    <View style={styles.iconWrap}>
      <Ionicons name="wallet-outline" size={48} color={COLORS.primary.main} />
    </View>
    <Text h3 style={styles.heading}>Confirmar recarga</Text>
    <Text body color={COLORS.text.secondary} style={styles.sub}>
      Revisa el resumen antes de continuar con el pago.
    </Text>
  </View>
);

export default WalletTopupConfirmHero;

const styles = StyleSheet.create({
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: COLORS.primary.tint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  heading: { marginBottom: 4 },
  sub: { marginBottom: 8 },
});
