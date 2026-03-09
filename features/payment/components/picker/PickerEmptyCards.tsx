import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PickerEmptyCards = () => (
  <View style={styles.container}>
    <Ionicons name="card-outline" size={32} color={COLORS.neutral.gray300} />
    <Text style={styles.text}>Sin tarjetas guardadas.</Text>
    <Text style={styles.subtext}>Agrega una desde Perfil → Métodos de pago.</Text>
  </View>
);

export default PickerEmptyCards;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 8,
  },
  text: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  subtext: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 12,
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: 18,
  },
});
